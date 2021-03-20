package com.github.mamadaliev.mail.service;

import com.github.mamadaliev.mail.exception.BadCredentialsException;
import com.github.mamadaliev.mail.model.Detail;
import com.github.mamadaliev.mail.model.Option;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import static java.lang.System.*;

@Service
public class MailService {

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

        return MessageStatus.builder()
                .code(200)
                .message("Email sent successfully.")
                .build();
    }

    public List<Message> inbox(Option option) {
        Properties properties = new Properties();
        Folder emailFolder;
        Message[] messages = new Message[0];

        properties.put("mail.pop3.host", option.getHost());
        properties.put("mail.pop3.port", option.getPort());
        //properties.put("mail.pop3.starttls.enable", "true");
        Session emailSession = Session.getDefaultInstance(properties);
        Store store = null;
        try {
            store = emailSession.getStore("pop3s");
            store.connect(option.getHost(), option.getFrom(), option.getPassword());
            emailFolder = store.getFolder("INBOX");
        } catch (MessagingException e) {
            throw new BadCredentialsException("Bad credentials, please try again.");
        }
        try {
            emailFolder.open(Folder.READ_ONLY);
            messages = emailFolder.getMessages();
            for (Message message : messages) {
                out.println(message);
            }
            emailFolder.close();
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return Arrays.stream(messages).collect(Collectors.toList());
    }

}
