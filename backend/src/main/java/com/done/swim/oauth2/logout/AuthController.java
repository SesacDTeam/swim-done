package com.done.swim.oauth2.logout;

import com.done.swim.domain.user.entity.User;
import com.done.swim.oauth2.OAuth2TokenService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private final OAuth2TokenService oAuth2TokenService;

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@AuthenticationPrincipal User user,
        HttpServletResponse response) {
        log.info("dfdf");

        return oAuth2TokenService.logout(String.valueOf(user), response);
    }
}
