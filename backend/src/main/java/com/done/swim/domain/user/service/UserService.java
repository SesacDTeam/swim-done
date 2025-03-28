package com.done.swim.domain.user.service;

import com.done.swim.domain.user.dto.responsedto.UserInfoResponseDto;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
import com.done.swim.oauth2.service.OAuth2TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final OAuth2TokenService oAuth2TokenService; // 토큰 관리 서비스 주입

    /**
     * 유저 정보 조회
     *
     * @param userId 유저 아이디
     */
    public UserInfoResponseDto getUserInfo(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND));

        return UserInfoResponseDto.from(user);

    }

    /**
     * 회원탈퇴
     */
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
