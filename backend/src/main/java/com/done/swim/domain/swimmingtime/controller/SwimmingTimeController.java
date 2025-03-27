package com.done.swim.domain.swimmingtime.controller;

import com.done.swim.common.ApiResponse;
import com.done.swim.domain.swimmingtime.dto.requestdto.SwimmingTimeRequestDto;
import com.done.swim.domain.swimmingtime.dto.responsedto.SwimmingTimeResponseDto;
import com.done.swim.domain.swimmingtime.service.SwimmingTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/swimmingtimes")
public class SwimmingTimeController {

    private final SwimmingTimeService swimmingTimeService;

    @PostMapping("/{poolId}")
    public ResponseEntity<ApiResponse<List<SwimmingTimeResponseDto>>> createSwimmingTimes(
            @PathVariable("poolId") Long poolId,
            @RequestBody List<SwimmingTimeRequestDto> requestDtos) {
        return ResponseEntity.ok(
                ApiResponse.ok(
                        swimmingTimeService.createSwimmingTimes(poolId, requestDtos)
                )
        );


    }

}
