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

    /**
     * 찜 생성
     *
     * @param poolId 수영장 식별 아이디
     * @param user   유저
     */
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

    /**
     * 유저의 찜 조회
     *
     * @param pageable 페이저블
     * @param user     유저 정보
     * @return
     */
    @GetMapping("/my/marks")
    public ResponseEntity<ApiResponse<PoolMarkListResponseDto>> getMyPoolMarks(
            Pageable pageable,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                ApiResponse.ok(
                        poolMarkService.getMyPoolMark(pageable, user.getId())
                )
        );
    }

    /**
     * 찜 삭제
     *
     * @param poolId 수영장 식별 아이디
     * @param user   유저
     */
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
