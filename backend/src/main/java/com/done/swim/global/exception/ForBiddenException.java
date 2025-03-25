package com.done.swim.global.exception;

public class ForBiddenException extends GlobalException {
  public ForBiddenException(ErrorCode errorCode) {
    super(errorCode);
  }

  public ForBiddenException() {
    super(ErrorCode.DEFAULT_FORBIDDEN);
  }
}
