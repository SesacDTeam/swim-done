package com.done.swim.global.exception.handler;

import com.done.swim.common.ApiResponse;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

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
    public ResponseEntity<ApiResponse<Void>> methodArgumentNotValidHandler(
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

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Object>> maxUploadSizeExceededHandler(
        MaxUploadSizeExceededException exception) {
        return ResponseEntity.status(ErrorCode.PAYLOAD_TOO_LARGE.getStatus())
            .body(ApiResponse
                .error(ErrorCode.PAYLOAD_TOO_LARGE.getMessage(),
                    ErrorCode.PAYLOAD_TOO_LARGE.getCode()));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Object>> methodArgumentTypeMismatchHandler(
        MethodArgumentTypeMismatchException exception) {
        return ResponseEntity.status(ErrorCode.INVALID_REQUEST.getStatus())
            .body(ApiResponse
                .error(ErrorCode.INVALID_REQUEST.getMessage(),
                    ErrorCode.INVALID_REQUEST.getCode()));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Object>> authenticationHandler(
        AuthenticationException exception) {
        return ResponseEntity.status(ErrorCode.INVALID_ACCESS_TOKEN.getStatus())
            .body(ApiResponse
                .error(ErrorCode.INVALID_ACCESS_TOKEN.getMessage(),
                    ErrorCode.INVALID_ACCESS_TOKEN.getCode()));
    }
  
    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ApiResponse<Object>> missingRequestCookieHandler() {
        return ResponseEntity.status(ErrorCode.INVALID_REQUEST.getStatus())
            .body(ApiResponse
                .error(ErrorCode.INVALID_REQUEST.getMessage(),
                    ErrorCode.INVALID_REQUEST.getCode()));
    }
}