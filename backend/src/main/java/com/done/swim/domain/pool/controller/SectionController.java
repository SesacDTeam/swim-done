package com.done.swim.domain.pool.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.pool.dto.responsedto.PoolResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSwimmingTimeResponseDto;
import com.done.swim.domain.pool.service.PoolService;
import com.done.swim.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sections")
public class SectionController {
    private final PoolService poolService;
    // 카카오 맵을 구현 해보니
    // 맵을 부를 때 각 마커에 대한 정보가 미리 전부 있어야함
    // api 문서 바꿔야함

    // 찜여부 => 리스트 바
    // 수영장 이름 => 리스트 바, 인포윈도우, 마커
    // 지역구 이름 => 리스트 바, 클러스터
    // 주소 => 리스트 바, 인포윈도우
    // 당일 자유수영 시간 => 인포윈도우
    // 수영장 식별 아이디 => 리스트바, 찜, 인포윈도우
    // 좌표 => 마커
    @GetMapping
    public ResponseEntity<ApiResponse<List<PoolResponseDto>>> getPools(
            @AuthenticationPrincipal User user
    ) {
//        List<PoolResponseDto> pools = poolService.getPoolsWithUserMark(user.getId());
        List<PoolResponseDto> pools = poolService.getPoolsWithUserMark(1L);
        return ResponseEntity.ok(
                ApiResponse.ok(pools)
        );

    }

    @GetMapping("/pools/{poolName}")
    public ResponseEntity<ApiResponse<PoolWithSwimmingTimeResponseDto>> getPool(@PathVariable String poolName) {
        PoolWithSwimmingTimeResponseDto pool = poolService.getPoolWithName(poolName);
        return ResponseEntity.ok(ApiResponse.ok(pool));

    }

}
