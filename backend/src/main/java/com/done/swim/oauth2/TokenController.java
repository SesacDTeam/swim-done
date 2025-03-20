package com.done.swim.oauth2;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class TokenController {

    private final OAuth2TokenService oAuth2TokenService;

    // refreshtoken을 쿠키로 보낸다면 @cookievalue 필요
    @PostMapping("/reissue")
    public ResponseEntity<?> reissueAccessToken(
            @CookieValue(name = "refreshToken", required = false)
            String refreshToken) {
        return oAuth2TokenService.reissueAccessToken(refreshToken);
    }
}
