package com.github.mamadaliev.mail.controller;

import com.github.mamadaliev.mail.controller.dto.*;
import com.github.mamadaliev.mail.service.MailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.Message;
import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.System.out;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
public class MailController {

    private final MailService mailService;

    private MessageDto mapToMessageDto(Message m) {
        try {
           m.getAllHeaders().asIterator().forEachRemaining(a -> {
               out.println(a.getName() + ": " + a.getValue());
           });
            return MessageDto.builder()
                    .id(m.getMessageNumber())
                    .from(m.getHeader("From")[0])
                    .to(m.getHeader("To")[0])
                    .subject(m.getSubject())
                    .date(m.getHeader("Date")[0])
                    .content(mailService.getTextFromMessage(m))
                    .build();
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
        throw new RuntimeException("Error");
    }

    @PostMapping("/mail/send")
    public ResponseDto send(@RequestBody MessageDataDto message) {
        return Optional.ofNullable(mailService.send(message.getOption(), message.getDetail()))
                .map(m -> ResponseDto.builder()
                        .message(m.getMessage()).build())
                .orElseGet(() -> ResponseDto.builder().message("Error").build());
    }

    @PostMapping("/mail/inbox/all")
    public List<MessageDto> getInboxMessages(@RequestBody ReadListDto param) {
        return mailService.getInboxMessages(param.getOption(), param.getStart(), param.getEnd(), param.getFolder())
                .stream()
                .map(this::mapToMessageDto).collect(Collectors.toList());
    }

    @PostMapping("/mail/inbox/message")
    public MessageDto getMessage(@RequestBody ReadOneDto param) {
        return Optional.ofNullable(mailService.getInboxMessage(param.getOption(), param.getId()))
                .map(this::mapToMessageDto).orElseThrow(() -> {
                    throw new RuntimeException("Error");
                });
    }
}
