package com.done.swim.domain.poolreview.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.requestdto.UpdatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.UpdatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.service.PoolReviewService;
import com.done.swim.domain.user.entity.User;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PoolReviewController {

  private final PoolReviewService poolReviewService;

  @PostMapping("/pools/{poolId}/reviews")
  public ResponseEntity<ApiResponse<CreatePoolReviewResponseDto>> createReview(
      @PathVariable Long poolId,
      @Valid @RequestBody CreatePoolReviewRequestDto requesteDto,
      @AuthenticationPrincipal User user
  ) {

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok("리뷰 생성 성공!!", "SUCCESS",
            poolReviewService.createReview(poolId, requesteDto, user.getId())));
  }

  @GetMapping("/my/reviews")
  public ResponseEntity<ApiResponse<Map<String, Object>>> getMyReviews(
      @AuthenticationPrincipal User user,
      Pageable pageable
  ) {

    Map<String, Object> responseBody = poolReviewService.getMyReviews(user.getId(), pageable);

    return ResponseEntity.ok(
        ApiResponse.ok(
            "조회 성공",
            "SUCCESS",
            responseBody
        )
    );
  }

  @PutMapping("/my/reviews/{reviewId}")
  public ResponseEntity<ApiResponse<UpdatePoolReviewResponseDto>> updateReview(
      @PathVariable Long reviewId,
      @Valid @RequestBody UpdatePoolReviewRequestDto requestDto,
      @AuthenticationPrincipal User user
  ) {
    UpdatePoolReviewResponseDto updateReview = poolReviewService.updateReview(reviewId, requestDto,
        user);
    return ResponseEntity.ok(
        ApiResponse.ok(
            "수정 성공!",
            "SUCCESS",
            updateReview
        )
    );
  }

  @DeleteMapping("/my/reviews/{reviewId}")
  public ResponseEntity<ApiResponse<Void>> deleteReview(
      @PathVariable Long reviewId,
      @AuthenticationPrincipal User user
  ) {
    poolReviewService.deleteReview(reviewId, user);

    return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(ApiResponse
            .ok("리뷰 삭제 성공",
                "NO_CONTENT",
                null));
  }
}
