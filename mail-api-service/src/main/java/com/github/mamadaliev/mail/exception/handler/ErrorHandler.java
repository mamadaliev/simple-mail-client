package com.github.mamadaliev.mail.exception.handler;

import com.github.mamadaliev.mail.controller.dto.ResponseDto;
import com.github.mamadaliev.mail.exception.BadCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseDto handleBadCredentialException(BadCredentialsException exception) {
        return ResponseDto.builder()
                .message(exception.getMessage())
                .build();
    }
}
