package com.done.swim.domain.pool.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSectionResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSwimmingTimeResponseDto;
import com.done.swim.domain.pool.service.PoolService;
import com.done.swim.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sections")
public class SectionController {
    private final PoolService poolService;

    /**
     * 특정 지역의 수영장 조회
     */
    @GetMapping("/{section}/pools")
    public ResponseEntity<ApiResponse<List<PoolWithSectionResponseDto>>> getPoolsWithSection(
            @AuthenticationPrincipal User user,
            @PathVariable String section) {
        log.info("section : {}", section);
        List<PoolWithSectionResponseDto> pools = poolService.getPoolsWithSection(section, user != null ? user.getId() : null);
        return ResponseEntity.ok(
                ApiResponse.ok(pools)
        );

    }

    /**
     * 수영장 요약 정보(인포윈도우) 조회
     *
     * @param poolName 수영장 이름
     */
    @GetMapping("/pools/{poolName}")
    public ResponseEntity<ApiResponse<PoolWithSwimmingTimeResponseDto>> getPool(@PathVariable String poolName) {
        PoolWithSwimmingTimeResponseDto pool = poolService.getPoolWithName(poolName);
        return ResponseEntity.ok(ApiResponse.ok(pool));
    }
}
