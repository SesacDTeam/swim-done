package com.done.swim.global.exception;

public class ServerErrorException extends GlobalException {
  public ServerErrorException(ErrorCode errorCode) {
    super(errorCode);
  }

  public ServerErrorException() {
    super(ErrorCode.SERVER_ERROR);
  }
}
