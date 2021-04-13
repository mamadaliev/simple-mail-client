package com.github.mamadaliev.mail.controller.dto;

import com.github.mamadaliev.mail.model.Option;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadListDto {

    private int start;

    private int end;

    private String folder;

    private Option option;
}
