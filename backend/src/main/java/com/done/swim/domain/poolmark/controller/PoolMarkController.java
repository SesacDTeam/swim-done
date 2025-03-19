package com.done.swim.domain.poolmark.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.poolmark.dto.PoolMarkListResponseDto;
import com.done.swim.domain.poolmark.service.PoolMarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class PoolMarkController {

  private final PoolMarkService poolMarkService;

  @PostMapping("/marks/pools/{poolId}")
  public ResponseEntity<ApiResponse> createPoolMark(@PathVariable Long poolId) {
    poolMarkService.createPoolMark(poolId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT)
      .body(ApiResponse
        .ok("찜하기 성공",
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
}
