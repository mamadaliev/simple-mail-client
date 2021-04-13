package com.github.mamadaliev.mail.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {

    private int id;

    private String from;

    private String to;

    private String subject;

    private String date;

    private String content;

}
