package com.done.swim.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2")   //   /api로 시작하는지 확인
@RequiredArgsConstructor
public class OAuth2Controller {

    private final ClientRegistrationRepository clientRegistrationRepository;

    @GetMapping("/kakao/url")
    public ResponseEntity<String> getKakaoLoginUrl() {
        ClientRegistration registration = clientRegistrationRepository.findByRegistrationId(
            "kakao");
        String kakaoLoginUrl = registration.getProviderDetails().getAuthorizationUri() +
            "?client_id=" + registration.getClientId() +
            "&redirect_uri=" + registration.getRedirectUri() +
            "&response_type=code";

        return ResponseEntity.ok(kakaoLoginUrl);
    }
}
