package com.github.mamadaliev.mail.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SentResponseDto {

    private String message;
}
