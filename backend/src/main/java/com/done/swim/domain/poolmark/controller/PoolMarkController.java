package com.done.swim.domain.poolmark.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.poolmark.service.PoolMarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/pools/mark")
public class PoolMarkController {

  private final PoolMarkService poolMarkService;

  @PostMapping("/{poolId}")
  public ResponseEntity<ApiResponse> createPoolMark(@PathVariable Long poolId) {
    poolMarkService.createPoolMark(poolId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT)
      .body(ApiResponse
        .ok("찜하기 성공",
          "NO_CONTENT",
          null));
  }
}
