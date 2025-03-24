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

    // TODO 지역구 좌표 정보 DB에
    // 해당 메소드는 좌표정보를 불러오는 용도로 사용될 예정
    // 새로운 컨트롤러 클래스로 분리 예정
//    @GetMapping
//    public ResponseEntity<ApiResponse<List<CoordinatesResponseDto>>> getCoordinates() {
//        List<CoordinatesResponseDto> coordinates = poolService.getCoordinates();
//        return ResponseEntity.ok(
//                ApiResponse.ok(coordinates)
//        );
//    }

    /**
     * 지역구 수영장 조회
     */
    @GetMapping("/{section}/pools")
    public ResponseEntity<ApiResponse<List<PoolWithSectionResponseDto>>> getPoolsWithSection(
            @AuthenticationPrincipal User user,
            @PathVariable String section) {
//        List<PoolResponseDto> pools = poolService.getPoolsWithUserMark(user.getId());
        List<PoolWithSectionResponseDto> pools = poolService.getPoolsWithSection(section, 1L);
        return ResponseEntity.ok(
                ApiResponse.ok(pools)
        );

    }

    /**
     * 수영장 요약 정보(인포윈도우) 조회
     */
    @GetMapping("/pools/{poolName}")
    public ResponseEntity<ApiResponse<PoolWithSwimmingTimeResponseDto>> getPool(@PathVariable String poolName) {
        PoolWithSwimmingTimeResponseDto pool = poolService.getPoolWithName(poolName);
        return ResponseEntity.ok(ApiResponse.ok(pool));
    }
}
