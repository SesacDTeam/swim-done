package com.done.swim.domain.user.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.user.dto.responsedto.GetUserInfoResponseDto;
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

//  @GetMapping("/user/info")
//  public ResponseEntity<ApiResponse<GetUserInfoResponseDto>> getUserInfo(
//      HttpServletRequest request) {
//    // 요청 헤더에서 Authorization을 가져옴 (Bearer 토큰 방식)
//    String authorizationHeader = request.getHeader("Authorization");
//
//    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
//      throw new RuntimeException("토큰이 제공되지 않았습니다.");
//    }
//
//    // "Bearer " 부분 제거하고 실제 토큰만 추출
//    String token = authorizationHeader.substring(7);
//
//    return ResponseEntity.ok(
//        ApiResponse.ok("조회 성공!",
//            "SUCCESS",
//            userService.getUserInfo(token)
//        )
//    );
//  }

  @GetMapping("/user/info")
  public ResponseEntity<ApiResponse<GetUserInfoResponseDto>> getUserInfo(
      @AuthenticationPrincipal User user) {

    GetUserInfoResponseDto getUserInfoResponseDto = userService.getUserInfo(user.getId());

    return ResponseEntity.ok(
        ApiResponse.ok("조회 성공!",
            "SUCCESS",
            getUserInfoResponseDto
        )
    );
  }

}
