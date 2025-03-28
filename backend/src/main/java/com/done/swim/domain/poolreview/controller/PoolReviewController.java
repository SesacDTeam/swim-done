package com.done.swim.domain.poolreview.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.requestdto.UpdatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.MyReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.ReviewResponseDto;
import com.done.swim.domain.poolreview.service.PoolReviewService;
import com.done.swim.domain.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PoolReviewController {

    private final PoolReviewService poolReviewService;

    /**
     * 리뷰 작성
     *
     * @param poolId     수영장 식별 아이디
     * @param requestDto 요청 DTO
     * @param user       유저
     */
    @PostMapping("/pools/{poolId}/reviews")
    public ResponseEntity<ApiResponse<CreatePoolReviewResponseDto>> createReview(
            @PathVariable Long poolId,
            @Valid @RequestBody CreatePoolReviewRequestDto requestDto,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("생성 완료", "SUCCESS",
                        poolReviewService.createReview(poolId, requestDto, user)));
    }

    /**
     * 유저의 리뷰 모음 조회
     *
     * @param user     유저
     * @param pageable 페이저블
     */
    @GetMapping("/my/reviews")
    public ResponseEntity<ApiResponse<MyReviewResponseDto>> getMyReviews(
            @AuthenticationPrincipal User user,
            Pageable pageable
    ) {
        MyReviewResponseDto myReviews = poolReviewService.getMyReviews(user.getId(), pageable);
        return ResponseEntity.ok(
                ApiResponse.ok(
                        "조회 성공",
                        "SUCCESS",
                        myReviews
                )
        );
    }

    /**
     * 리뷰 단건 조회
     *
     * @param reviewId 리뷰 식별 아이디
     * @param user     유저
     */
    @GetMapping("/my/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<ReviewResponseDto>> getReview(
            @PathVariable Long reviewId,
            @AuthenticationPrincipal User user
    ) {
        ReviewResponseDto getReviewBeforeDate = poolReviewService.getReview(
                reviewId, user.getId());

        return ResponseEntity.ok(
                ApiResponse.ok(
                        "조회 성공",
                        "SUCCESS",
                        getReviewBeforeDate
                )
        );
    }

    /**
     * 리뷰 수정
     *
     * @param reviewId   리뷰 아이디
     * @param requestDto 요청 DTO
     * @param user       유저
     */
    @PutMapping("/my/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody UpdatePoolReviewRequestDto requestDto,
            @AuthenticationPrincipal User user
    ) {
        poolReviewService.updateReview(reviewId, requestDto, user);
        return ResponseEntity.ok(
                ApiResponse.ok(
                        "수정 완료",
                        "SUCCESS",
                        null
                )
        );
    }

    /**
     * 리뷰 삭제
     *
     * @param reviewId 리뷰 아이디
     * @param user     유저
     */
    @DeleteMapping("/my/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable Long reviewId,
            @AuthenticationPrincipal User user
    ) {
        poolReviewService.deleteReview(reviewId, user);

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse
                        .ok("삭제 완료",
                                "NO_CONTENT",
                                null));
    }
}
