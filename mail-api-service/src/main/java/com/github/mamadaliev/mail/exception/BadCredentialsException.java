package com.github.mamadaliev.mail.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data
@AllArgsConstructor
public class BadCredentialsException extends RuntimeException {

    private String message;
}
