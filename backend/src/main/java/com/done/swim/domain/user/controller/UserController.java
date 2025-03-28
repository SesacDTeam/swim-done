package com.done.swim.domain.user.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.user.dto.responsedto.UserInfoResponseDto;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    /**
     * 유저 정보 조회
     *
     * @param user 유저
     */
    @GetMapping("/user/info")
    public ResponseEntity<ApiResponse<UserInfoResponseDto>> getUserInfo(
            @AuthenticationPrincipal User user) {

        UserInfoResponseDto userInfoResponseDto = userService.getUserInfo(user.getId());

        return ResponseEntity.ok(
                ApiResponse.ok("조회 성공!",
                        "SUCCESS",
                        userInfoResponseDto
                )
        );
    }

}
