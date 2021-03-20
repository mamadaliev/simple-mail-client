package com.github.mamadaliev.mail.service;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageStatus {

    private int code;

    private String message;
}
