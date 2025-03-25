package com.done.swim.global.exception.handler;

import com.done.swim.common.ApiResponse;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(GlobalException.class)
  public ResponseEntity<ApiResponse<Void>> handleGlobalException(GlobalException exception) {
    ErrorCode errorCode = exception.getErrorCode();

    return ResponseEntity
      .status(errorCode.getStatus())
      .body(ApiResponse.error(errorCode.getMessage(), errorCode.getCode()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Object>> methodArgumentNotValidHandler(
    MethodArgumentNotValidException exception) {

    List<String> errorMessages = exception.getBindingResult().getFieldErrors()
      .stream()
      .map(FieldError::getDefaultMessage)
      .toList();

    String errorMessage = errorMessages.isEmpty()
      ? ErrorCode.INVALID_INPUT.getMessage()
      : errorMessages.getFirst();

    return ResponseEntity
      .status(ErrorCode.INVALID_INPUT.getStatus())
      .body(ApiResponse.error(errorMessage,
        ErrorCode.INVALID_INPUT.getCode()));
  }

}