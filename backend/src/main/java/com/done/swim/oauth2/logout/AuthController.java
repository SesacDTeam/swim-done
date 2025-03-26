package com.done.swim.oauth2.logout;

import com.done.swim.domain.user.entity.User;
import com.done.swim.oauth2.OAuth2TokenService;
import com.done.swim.oauth2.UserWithdrawService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private final OAuth2TokenService oAuth2TokenService;
    private final HttpServletRequest request;
    private final UserWithdrawService userWithdrawService;

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@AuthenticationPrincipal User user,
        HttpServletResponse response) {

        return oAuth2TokenService.logout(user, response);
    }

    @DeleteMapping("/withdraw")
    public ResponseEntity<String> withdrawUser(
        @AuthenticationPrincipal User user, HttpServletResponse response) {
        Long userId = user.getId(); // 인증된 사용자 ID 가져오기

        // 1. 리프레시 토큰 삭제 (Redis)
        oAuth2TokenService.deleteRefreshToken(userId);

        // 2. 유저 삭제 (DB)
        userWithdrawService.deleteUserWithTokens(userId); // 유저 삭제

        // 3. 로그아웃 로직 실행 (액세스 토큰 제거)
        oAuth2TokenService.logout(user, response);

        return ResponseEntity.ok("회원 탈퇴 성공");
    }
}
