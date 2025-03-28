package com.done.swim.domain.pool.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.pool.dto.responsedto.PoolDetailResponseDto;
import com.done.swim.domain.pool.service.PoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pools")
public class PoolController {

    private final PoolService poolService;

    /**
     * 특정 수영장의 상세 정보
     *
     * @param poolId 수영장 식별 아이디
     */
    @GetMapping("/{poolId}")
    public ResponseEntity<ApiResponse<PoolDetailResponseDto>> fetchPoolDetail(
            @PathVariable Long poolId) {
        return ResponseEntity.ok(ApiResponse.ok(poolService.fetchPoolDetail(poolId)));
    }
}
