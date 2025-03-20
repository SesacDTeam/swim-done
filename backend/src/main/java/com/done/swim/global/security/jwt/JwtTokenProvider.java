package com.done.swim.global.security.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final long tokenValidityInMilliseconds = 1000L * 60 * 60 * 24; // 24시간 유효
    @Value("${jwt.secret}") // application.properties에서 JWT 비밀키 로드
    private String secretKey;
    private Key key;

    @PostConstruct
    public void init() {
        // JWT 서명을 위한 Key 초기화
        key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // 1️ JWT 생성
    public String generateToken(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        String email = null;
        if (principal instanceof OAuth2User oAuth2User) {

            log.info("OAuth2User Attributes: {}", oAuth2User.getAttributes());  // 전체 속성 출력

            // kakao_account 내부에서 이메일 추출
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes()
                .get("kakao_account");
            if (kakaoAccount != null) {
                email = (String) kakaoAccount.get("email");  // "email" 속성에 접근
            }
        } else {
            throw new IllegalArgumentException("Unsupported authentication principal");
        }

        log.info("JWT 생성 시 이메일: {}", email); // JWT 생성 시 이메일 확인

        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidityInMilliseconds);

        return Jwts.builder()
            .setSubject(email) // 이메일을 payload에 저장
            .claim("email", email)
            .setIssuedAt(now) // 발급 시간
            .setExpiration(validity) // 만료 시간
            .signWith(key, SignatureAlgorithm.HS256) // 서명 알고리즘
            .compact();
    }

    // 2️ JWT 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // 3️ JWT에서 사용자 이메일 추출
    public String getUserEmail(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
