package com.github.mamadaliev.mail.controller.dto;

import com.github.mamadaliev.mail.model.Detail;
import com.github.mamadaliev.mail.model.Option;
import lombok.Data;

@Data
public class MessageDto {

    private Option option;

    private Detail detail;
}
