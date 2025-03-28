package com.done.swim.domain.pool.service;

import com.done.swim.domain.pool.dto.responsedto.PoolDetailResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSectionResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSwimmingTimeResponseDto;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.swimmingtime.entity.Week;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolService {

    private final PoolRepository poolRepository;

    /**
     * 수영장 상세 정보
     *
     * @param poolId 수영장 식별 아이디
     */
    public PoolDetailResponseDto fetchPoolDetail(Long poolId) {
        Pool pool = poolRepository.findByIdWithCommentAndTimes(poolId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND));
        return PoolDetailResponseDto.from(pool);
    }

    /**
     * 수영장 요약 정보
     *
     * @param poolName 수영장 이름
     */
    public PoolWithSwimmingTimeResponseDto getPoolWithName(String poolName) {
        String nowDayOfWeek = Week.getNowDayOfWeekInKorean(); // 오늘 요일, 예시) 월요일
        return PoolWithSwimmingTimeResponseDto.from(
                poolRepository.getPoolWithName(poolName, Week.from(nowDayOfWeek))
                        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND)),
                nowDayOfWeek
        );
    }

    /**
     * @param section 지역명
     * @param userId  유저 아이디
     */
    public List<PoolWithSectionResponseDto> getPoolsWithSection(String section, Long userId) {
        List<Pool> pools = poolRepository.findBySectionWithUserId(section, userId);

        return pools.stream().map(p -> PoolWithSectionResponseDto.from(p, userId)).toList();
    }
}
