package com.done.swim.domain.poolreview.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.poolreview.service.PoolReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PoolReviewController {

  private final PoolReviewService poolReviewService;

  @PostMapping("/pools/{poolId}/reviews")
  public ResponseEntity<ApiResponse<Void>> CreateReview(@PathVariable Long poolId,
      @RequestBody String content) {
    poolReviewService.CreateReview(poolId, content);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok("리뷰 생성 성공!!", "SUCCESS", null));
  }
}
