package com.done.swim.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  // 회원 관련 오류 (2000번)
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "2010", "사용자를 찾을 수 없습니다."),

  // 인증 관련 오류 (3000번)
  INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "3001", "유효하지 않은 JWT TOKEN 입니다."),
  INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "3002", "유효하지 않은 REFRESH TOKEN 입니다."),

  // 클라이언트 오류 (4000번)
  DEFAULT_FORBIDDEN(HttpStatus.FORBIDDEN, "4000", "권한이 없습니다."),
  PAYLOAD_TOO_LARGE(HttpStatus.BAD_REQUEST, "4001", "파일 크키가 너무 큽니다. 3MB 이하로 업로드해주세요."),
  AUTHOR_ONLY(HttpStatus.FORBIDDEN, "4002", "작성자만 접근할 수 있습니다."),
  INVALID_INPUT(HttpStatus.BAD_REQUEST, "4003", "입력값이 올바르지 않습니다."),
  DEFAULT_NOT_FOUND(HttpStatus.BAD_REQUEST, "4004", "해당 리소스가 존재하지 않습니다."),
  INVALID_REQUEST(HttpStatus.BAD_REQUEST, "4005", "요청이 올바르지 않습니다."),

  // 수영장 오류 (4100번)
  POOL_NOT_FOUND(HttpStatus.BAD_REQUEST, "4100", "해당 수영장이 존재하지 않습니다."),

  // 찜하기 오류 (4200번)
  ALREADY_MARK(HttpStatus.BAD_REQUEST, "4200", "이미 찜한 수영장입니다."),
  NOT_MARK(HttpStatus.BAD_REQUEST, "4201", "찜하지 않은 수영장입니다."),

  // 리뷰 오류 (4300번)
  REVIEW_NOT_FOUND(HttpStatus.BAD_REQUEST, "4300", "해당 리뷰가 존재하지 않습니다."),

  //네트워크, 데이터베이스 오류 등
  SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "5000", "서버 내부 오류가 발생했습니다."),
  FILE_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "5001", "파일 업로드 중 오류가 발생했습니다."),
  FILE_DELETE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "5002", "파일 삭제 중 오류가 발생했습니다");

  private final HttpStatus status;
  private final String code;
  private final String message;
}
