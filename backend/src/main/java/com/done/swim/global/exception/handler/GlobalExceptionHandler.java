package com.done.swim.global.exception.handler;

import com.done.swim.common.ApiResponse;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(GlobalException.class)
  public ResponseEntity<ApiResponse<Void>> handleGlobalException(GlobalException exception) {
    ErrorCode errorCode = exception.getErrorCode();

    return ResponseEntity
      .status(errorCode.getStatus())
      .body(ApiResponse.error(errorCode.getMessage(), errorCode.getCode()));
  }

}