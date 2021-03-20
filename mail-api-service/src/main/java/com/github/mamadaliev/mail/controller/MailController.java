package com.github.mamadaliev.mail.controller;

import com.github.mamadaliev.mail.controller.dto.MessageDto;
import com.github.mamadaliev.mail.controller.dto.SentResponseDto;
import com.github.mamadaliev.mail.service.MailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping("/mail/send")
    public SentResponseDto send(@RequestBody MessageDto message) {
        return Optional.ofNullable(mailService.send(message.getOption(), message.getDetail()))
                .map(sentMessage -> SentResponseDto.builder()
                        .message(sentMessage.getMessage()).build())
                .orElseGet(() -> SentResponseDto.builder().message("Error").build());
    }
}
