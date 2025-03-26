package com.done.swim.domain.user.service;

import com.done.swim.domain.user.dto.responsedto.GetUserInfoResponseDto;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.global.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;

  public GetUserInfoResponseDto getUserInfo(String token) {
    Long userId = jwtTokenProvider.getUserId(token);

    // 사용자 정보 조회 후 DTO 변환
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return GetUserInfoResponseDto.from(user);

  }
}
