package com.done.swim.domain.poolmark.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.poolmark.dto.PoolMarkListResponseDto;
import com.done.swim.domain.poolmark.service.PoolMarkService;
import com.done.swim.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class PoolMarkController {

  private final PoolMarkService poolMarkService;

  @PostMapping("/marks/pools/{poolId}")
  public ResponseEntity<ApiResponse<Void>> createPoolMark(
    @PathVariable Long poolId,
    @AuthenticationPrincipal User user
  ) {
    poolMarkService.createPoolMark(poolId, user);

    return ResponseEntity.status(HttpStatus.NO_CONTENT)
      .body(ApiResponse
        .ok("찜 하기 성공",
          "NO_CONTENT",
          null));
  }

  @GetMapping("/my/marks")
  public ResponseEntity<ApiResponse<PoolMarkListResponseDto>> getMyPoolMarks(Pageable pageable) {
    return ResponseEntity.ok(
      ApiResponse.ok(
        poolMarkService.getMyPoolMark(pageable)
      )
    );
  }

  @DeleteMapping("/marks/pools/{poolId}")
  public ResponseEntity<ApiResponse<Void>> deleteMyPoolMark(
    @PathVariable Long poolId,
    @AuthenticationPrincipal User user
  ) {
    poolMarkService.deleteMyPoolMark(poolId, user);

    return ResponseEntity.status(HttpStatus.NO_CONTENT)
      .body(ApiResponse
        .ok("찜 삭제 성공",
          "NO_CONTENT",
          null));
  }
}
