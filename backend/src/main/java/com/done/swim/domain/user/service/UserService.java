package com.done.swim.domain.user.service;

import com.done.swim.domain.user.dto.responsedto.UserInfoResponseDto;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
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
}
