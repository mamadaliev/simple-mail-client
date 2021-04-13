package com.github.mamadaliev.mail.controller.dto;

import com.github.mamadaliev.mail.model.Option;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadOneDto {

    private int id;

    private Option option;
}
