package com.done.swim.oauth2;

import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import com.done.swim.global.exception.InvalidRefreshTokenException;
import com.done.swim.global.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OAuth2TokenService {
  
    // redis에 토큰 저장 및 관리하는 service (마치 인터페이스 역할임)
    private final RedisTemplate<String, String> redisTemplate;
    private final long refreshTokenValidityInMilliseconds = 1000L * 60 * 60 * 24 * 30; // 30일
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Value("${cookie.secure}")
    private boolean secure;

    // 리프레시 토큰 저장(redis)
    public void saveRefreshToken(Long userId, String refreshToken) {
        redisTemplate.opsForValue()
            .set("REFRESH_TOKEN:" + userId, refreshToken, refreshTokenValidityInMilliseconds,
                TimeUnit.MILLISECONDS);
    }

    // 리프레시 토큰 조회
    public String getRefreshToken(Long userId) {
        return redisTemplate.opsForValue().get("REFRESH_TOKEN:" + userId);
    }

    // 로그아웃 처리 (리프레시 토큰 삭제 + SecurityContext 초기화 + 쿠키 삭제)
    public ResponseEntity<String> logout(String accessToken, HttpServletResponse response) {
        log.info("🚀 로그아웃 API 호출됨");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // ✅ 액세스 토큰 검증
        if (accessToken == null || !accessToken.startsWith("Bearer ")) {
            log.error("❌ 액세스 토큰이 없음 또는 형식이 잘못됨");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
        }
        accessToken = accessToken.substring(7);
        log.info("🔑 액세스 토큰 확인: {}", accessToken);

        // 토큰에서 유저 id 추출
        Long userId;
        try {
            userId = jwtTokenProvider.getUserId(accessToken);
        } catch (Exception e) {
            log.error("❌ 유효하지 않은 토큰", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        log.info("🆔 사용자 ID: {}", userId);

        // 레디스에서 리프레시 토큰 삭제
        redisTemplate.delete("REFRESH_TOKEN:" + userId);

        // SecurityContextHolder에서 인증 정보 삭제 (로그아웃 후 인증정보 남지 않도록 함)
        SecurityContextHolder.clearContext();
        log.info("🔒 SecurityContextHolder 인증 정보 삭제 완료");

        // 쿠키에서 리프레시 토큰 삭제
        // 쿠키 만료 시간을 현재 시간보다 이전으로 설정해서 브라우저에서 쿠키 자동 삭제함
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", "")
            .path("/") // 쿠키 경로 설정
            .maxAge(0) // 만료 시간 0으로 설정 -> 삭제 처리
            .httpOnly(true)
            .secure(true)
            .build();

        // 쿠키 삭제 응답 헤더에 추가
        response.addHeader("Set-Cookie", refreshTokenCookie.toString());
        return ResponseEntity.ok("로그아웃 성공");

  // redis에 토큰 저장 및 관리하는 service (마치 인터페이스 역할임)
  private final RedisTemplate<String, String> redisTemplate;
  private final long refreshTokenValidityInMilliseconds = 1000L * 60 * 60 * 24 * 30; // 30일
  private final JwtTokenProvider jwtTokenProvider;
  private final UserRepository userRepository;

  @Value("${cookie.secure}")
  private boolean secure;

  // 리프레시 토큰 저장(redis)
  public void saveRefreshToken(Long userId, String refreshToken) {
    redisTemplate.opsForValue().set("REFRESH_TOKEN:" + userId, refreshToken, refreshTokenValidityInMilliseconds, TimeUnit.MILLISECONDS);
  }

  // 리프레시 토큰 조회
  public String getRefreshToken(Long userId) {
    return redisTemplate.opsForValue().get("REFRESH_TOKEN:" + userId);
  }

  // 리프레시 토큰 삭제 (로그아웃 시 사용)
  public void deleteToken(String accessToken, HttpServletResponse response) {

    // 토큰에서 유저 id 추출
    Long userId = jwtTokenProvider.getUserId(accessToken);

    // 레디스에서 리프레시 토큰 삭제
    redisTemplate.delete("REFRESH_TOKEN:" + userId);

    // SecurityContextHolder에서 인증 정보 삭제 (로그아웃 후 인증정보 남지 않도록 함)
    SecurityContextHolder.clearContext();

    // 쿠키에서 리프레시 토큰 삭제
    // 쿠키 만료 시간을 현재 시간보다 이전으로 설정해서 브라우저에서 쿠키 자동 삭제함
    ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", "")
      .path("/") // 쿠키 경로 설정
      .maxAge(0) // 만료 시간 0으로 설정 -> 삭제 처리
      .httpOnly(true)
      .secure(secure)
      .build();

    // 쿠키 삭제 응답 헤더에 추가
    response.addHeader("Set-Cookie", refreshTokenCookie.toString());
  }

  // 액세스 토큰 재발급
  @Transactional
  public ResponseEntity<?> reissueAccessToken(String refreshToken) {

    // 리프레시 토큰 검증
    if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
      throw new InvalidRefreshTokenException(ErrorCode.INVALID_REFRESH_TOKEN);
    }

    // 레디스에 저장된 리프레시 토큰 조회
    Long userId = jwtTokenProvider.getUserId(refreshToken);

    // 기존에 레디스에서 저장된 리프레시 토큰 가져와서 비교
    String storedRefreshToken = getRefreshToken(userId);

    if (!refreshToken.equals(storedRefreshToken)) {
      throw new InvalidRefreshTokenException(ErrorCode.INVALID_REFRESH_TOKEN);

    }

    // 유저 정보 조회
    User user = userRepository.findById(userId)
      .orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));


        // 리프레시 토큰 검증
        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse
                    .error("리프레시 토큰이 유효하지 않습니다.",
                        "UNAUTHORIZED"));
        }

    // 새로운 액세스 토큰 발급
    String newAccessToken = jwtTokenProvider.createAccessToken(user);


    return ResponseEntity.ok()
      .header("Authorization", "Bearer " + newAccessToken)
      .body("새로운 액세스 토큰이 발급되었습니다.");

        // 기존에 레디스에서 저장된 리프레시 토큰 가져와서 비교
        String storedRefreshToken = getRefreshToken(userId);

        if (!refreshToken.equals(storedRefreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse
                    .error("유효하지 않은 리프레시 토큰입니다.",
                        "UNAUTHORIZED"));
        }

        // 유저 정보 조회
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // OAuth2 인증 정보를 가져오기 (SecurityContext에서 직접 가져오기)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 새로운 액세스 토큰 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(user);
        log.info("New AccessToken:: {}", newAccessToken);

        return ResponseEntity.ok()
            .header("Authorization", "Bearer " + newAccessToken)
            .body("새로운 액세스 토큰이 발급되었습니다.");

    }

  }

}
