package com.github.mamadaliev.mail.model;

import lombok.Data;

import java.util.List;

@Data
public class Detail {

    private String to;

    private String subject;

    private String message;

    private List<String> files;

}
