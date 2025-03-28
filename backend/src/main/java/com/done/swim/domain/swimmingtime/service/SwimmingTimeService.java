package com.done.swim.domain.swimmingtime.service;


import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.swimmingtime.dto.requestdto.SwimmingTimeRequestDto;
import com.done.swim.domain.swimmingtime.dto.responsedto.SwimmingTimeResponseDto;
import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import com.done.swim.domain.swimmingtime.repository.SwimmingTimeRepository;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SwimmingTimeService {
    private final SwimmingTimeRepository swimmingTimeRepository;
    private final PoolRepository poolRepository;

    /**
     * 수영장 자유 수영 시간 저장
     *
     * @param poolId      수영장 아이디
     * @param requestDtos 요청 DTO
     */
    @Transactional
    public List<SwimmingTimeResponseDto> createSwimmingTimes(Long poolId, List<SwimmingTimeRequestDto> requestDtos) {

        Pool pool = poolRepository.findById(poolId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND)
        );

        List<SwimmingTime> swimmingTimes = requestDtos.stream().map(
                (dto) -> dto.toEntity(pool)
        ).toList();

        return swimmingTimeRepository.saveAll(swimmingTimes)
                .stream().map(
                        SwimmingTimeResponseDto::from
                ).toList();
    }
}
