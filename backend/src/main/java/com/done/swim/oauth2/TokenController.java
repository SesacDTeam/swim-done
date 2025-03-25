package com.done.swim.oauth2;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class TokenController {

  private final OAuth2TokenService oAuth2TokenService;

  // 액세스 토큰 재발급
  // 쿠키에서 리프레시 토큰 가져오는 방법 채택
  // refreshtoken을 쿠키로 보낸다면 @cookievalue 필요 (이거는 따로 getCookie 함수 필요없음!!)
  @PostMapping("/reissue")
  public ResponseEntity<?> reissueAccessToken(
    @CookieValue(name = "refreshToken")
    String refreshToken) {

    return oAuth2TokenService.reissueAccessToken(refreshToken);
  }

}
