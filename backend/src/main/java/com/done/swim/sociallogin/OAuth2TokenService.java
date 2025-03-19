package com.done.swim.sociallogin;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OAuth2TokenService {

    // redis에 토큰 저장 및 관리하는 service (마치 인터페이스 역할임)
    private final RedisTemplate<String, String> redisTemplate;
    private final long refreshTokenValidityInMilliseconds = 1000L * 60 * 60 * 24 * 30; // 30일


    // refresh token redis에 저장
    public void saveRefreshToken(String userId, String refreshToken) {
        redisTemplate.opsForValue().set("REFRESH_TOKEN:" + userId, refreshToken, refreshTokenValidityInMilliseconds, TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String userId) {
        return redisTemplate.opsForValue().get("REFRESH_TOKEN:" + userId);
    }

    public void deleteTokens(String userId) {
        redisTemplate.delete("REFRESH_TOKEN:" + userId);
    }
}
