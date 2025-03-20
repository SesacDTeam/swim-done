package com.done.swim.oauth2;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.global.jwt.JwtTokenProvider;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OAuth2TokenService {

    // redis에 토큰 저장 및 관리하는 service (마치 인터페이스 역할임)
    private final RedisTemplate<String, String> redisTemplate;
    private final long refreshTokenValidityInMilliseconds = 1000L * 60 * 60 * 24 * 30; // 30일
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;


    // refresh token redis에 저장
    public void saveRefreshToken(Long userId, String refreshToken) {
        redisTemplate.opsForValue()
            .set("REFRESH_TOKEN:" + userId, refreshToken, refreshTokenValidityInMilliseconds,
                TimeUnit.MILLISECONDS);
    }

    // 조회
    public String getRefreshToken(Long userId) {
        return redisTemplate.opsForValue().get("REFRESH_TOKEN:" + userId);
    }


    // 삭제 (로그아웃 시 사용)
    public void deleteToken(Long userId) {
        redisTemplate.delete("REFRESH_TOKEN:" + userId);
    }

    // 재발급
    @Transactional
    public ResponseEntity<?> reissueAccessToken(String refreshToken) {

        Long userId = jwtTokenProvider.getUserId(refreshToken);
        String storedRefreshToken = getRefreshToken(userId);

        // 기존에 저장된 리프레시 토큰이랑 비교
        if (!refreshToken.equals(storedRefreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error(
                    "유효하지 않은 토큰입니다",
                    "UNAUTHORIZED"
                ));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        // User 객체 가져오기
        User user = oAuth2User.getUser();

        // 새로운 액세스 토큰
        String newAccessToken = jwtTokenProvider.createAccessToken(authentication, user);

        return ResponseEntity.ok()
            .header("Authorization", "Bearer " + newAccessToken)
            .body("New access token issued");
    }
}
