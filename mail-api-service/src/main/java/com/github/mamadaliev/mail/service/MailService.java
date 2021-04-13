package com.github.mamadaliev.mail.service;

import com.github.mamadaliev.mail.exception.BadCredentialsException;
import com.github.mamadaliev.mail.model.Detail;
import com.github.mamadaliev.mail.model.Option;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.lang.System.*;

@Service
public class MailService {

    private final static String GMAIL_ALL = "[Gmail]/All Mail";
    private final static String GMAIL_SENT = "[Gmail]/Sent Mail";

    private final Map<String, List<Message>> messages = new HashMap<>();

    public MessageStatus send(Option option, Detail detail) {

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", option.getHost());
        props.put("mail.smtp.port", option.getPort());

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(option.getFrom(), option.getPassword());
            }
        });

        Message msg = new MimeMessage(session);
        try {
            msg.setFrom(new InternetAddress(option.getFrom(), false));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(detail.getTo()));
            msg.setSubject(detail.getSubject());
            msg.setContent(detail.getMessage(), "text/html");
            msg.setSentDate(new Date());

            Transport.send(msg);

        } catch (MessagingException e) {
            throw new BadCredentialsException("Bad credentials, please try again.");
        }

        this.messages.put(GMAIL_SENT, getInboxMessages(option, 0, 10, GMAIL_SENT, true));

        return MessageStatus.builder()
                .code(200)
                .message("Email sent successfully.")
                .build();
    }

    public List<Message> getInboxMessages(Option option, int start, int end, String folder) {
        return getInboxMessages(option, start, end, folder, false);
    }

    public List<Message> getInboxMessages(Option option, int start, int end, String folder, boolean isForceLoad) {
        if (!isForceLoad) {
            if (this.messages.get(GMAIL_SENT) != null) {
                return this.messages.get(GMAIL_SENT);
            }
        }

        Properties properties = new Properties();
        Folder emailFolder;
        Message[] messages = new Message[0];

        properties.put("mail.pop3.host", "imap.gmail.com");
        properties.put("mail.pop3.port", "578");
        //properties.put("mail.pop3.starttls.enable", "true");
        Session emailSession = Session.getDefaultInstance(properties);
        Store store;
        try {
            store = emailSession.getStore("imaps");
            store.connect(option.getHost(), option.getFrom(), option.getPassword());
            for (Folder f : store.getDefaultFolder().list()) {
                err.println(f.getName());
                err.println(f.getFullName());
            }
            emailFolder = store.getFolder(folder);
        } catch (MessagingException e) {
            throw new BadCredentialsException("Bad credentials, please try again.");
        }
        try {
            emailFolder.open(Folder.READ_ONLY);
            int messageCount = emailFolder.getMessageCount();
            if (messageCount <= end) {
                end = messageCount;
            }
            messages = emailFolder.getMessages(start, end);
            for (Message message : messages) {
                out.println(message.getSubject());
                try {
                    out.println(getTextFromMessage(message));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (folder != null) {
                if (folder.equals(GMAIL_ALL)) {
                    this.messages.put(GMAIL_ALL, Arrays.asList(messages));
                } else if (folder.equals(GMAIL_SENT)) {
                    this.messages.put(GMAIL_SENT, Arrays.asList(messages));
                }
            }
            //emailFolder.close();
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return Arrays.stream(messages).collect(Collectors.toList());
    }

    public Message getInboxMessage(Option option, int id) {
        Properties properties = new Properties();
        Folder emailFolder;
        Message[] messages = new Message[0];

        properties.put("mail.pop3.host", option.getHost());
        properties.put("mail.pop3.port", option.getPort());
        //properties.put("mail.pop3.starttls.enable", "true");
        Session emailSession = Session.getDefaultInstance(properties);
        Store store;
        try {
            store = emailSession.getStore("pop3s");
            store.connect(option.getHost(), option.getFrom(), option.getPassword());
            emailFolder = store.getFolder("INBOX");
        } catch (MessagingException e) {
            throw new BadCredentialsException("Bad credentials, please try again.");
        }
        try {
            emailFolder.open(Folder.READ_ONLY);
            int[] ids = new int[1];
            ids[0] = id;
            messages = emailFolder.getMessages(ids);
            for (Message message : messages) {
                out.println(message.getSubject());
                try {
                    out.println(message.getContent());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            //emailFolder.close();
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return messages[0];
    }

    public String getTextFromMessage(Message message) throws MessagingException, IOException {
        String result = "";
        if (message.isMimeType("text/plain")) {
            result = message.getContent().toString();
        } else if (message.isMimeType("multipart/*")) {
            MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
            result = getTextFromMimeMultipart(mimeMultipart);
        }
        return result;
    }

    private String getTextFromMimeMultipart(
            MimeMultipart mimeMultipart)  throws MessagingException, IOException{
        String result = "";
        int count = mimeMultipart.getCount();
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
            if (bodyPart.isMimeType("text/plain")) {
                result = result + "\n" + bodyPart.getContent();
                break; // without break same text appears twice in my tests
            } else if (bodyPart.isMimeType("text/html")) {
                String html = (String) bodyPart.getContent();
                result = result + "\n" + Jsoup.parse(html).html();
            } else if (bodyPart.getContent() instanceof MimeMultipart){
                result = result + getTextFromMimeMultipart((MimeMultipart)bodyPart.getContent());
            }
        }
        return result;
    }
}
