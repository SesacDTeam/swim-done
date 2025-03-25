package com.done.swim.global.exception;

public class InvalidRefreshTokenException extends GlobalException {
  public InvalidRefreshTokenException(ErrorCode errorCode) {
    super(errorCode);
  }
}
