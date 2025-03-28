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

    @Transactional
    public void deleteUserWithTokens(Long userId) {

        // 유저 존재 여부 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        // Redis에서 리프레시 토큰 삭제
        oAuth2TokenService.deleteRefreshToken(userId);

        // 유저 정보 삭제
        userRepository.delete(user);
    }
}
