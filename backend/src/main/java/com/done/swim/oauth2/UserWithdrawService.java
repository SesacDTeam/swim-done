package com.done.swim.oauth2;

import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserWithdrawService {

    private final UserRepository userRepository;
    private final OAuth2TokenService oAuth2TokenService; // 토큰 관리 서비스 주입
    private final KakaoService kakaoService; // 카카오톡 서비스 주입

    @Transactional
    public void deleteUserWithTokens(Long userId) {

        // 1. 유저 존재 여부 확인
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        // 2. 카카오톡 엑세스 토큰을 사용해 카카오 계정과의 연결 끊기
        String kakaoAccessToken = user.getKakaoAccessToken();
        if (kakaoAccessToken != null) {
            kakaoService.disconnectKakaoAccount(kakaoAccessToken); // 카카오 계정 연결 끊기
        }

        // 3. Redis에서 리프레시 토큰 삭제
        oAuth2TokenService.deleteRefreshToken(userId);

        // 4. 유저 정보 삭제
        userRepository.deleteById(userId);
    }
}
