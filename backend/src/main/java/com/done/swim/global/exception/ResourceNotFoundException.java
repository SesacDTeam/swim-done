package com.done.swim.global.exception;

public class ResourceNotFoundException extends GlobalException {
  public ResourceNotFoundException(ErrorCode errorCode) {
    super(errorCode);
  }

  public ResourceNotFoundException() {
    super(ErrorCode.DEFAULT_NOT_FOUND);
  }
}
