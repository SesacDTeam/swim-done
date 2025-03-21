package com.done.swim.domain.pool.service;

import com.done.swim.domain.pool.dto.responsedto.PoolDetailResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSwimmingTimeResponseDto;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.swimmingtime.entity.Week;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolService {

    private final PoolRepository poolRepository;

    public PoolDetailResponseDto fetchPoolDetail(Long poolId) {
        Pool pool = poolRepository.findByIdWithCommentAndTimes(poolId)
                //이 후 GlobalException 정의 후 수정 예정
                .orElseThrow(() -> new IllegalArgumentException("해당 수영장이 존재하지 않습니다."));
        return PoolDetailResponseDto.from(pool);
    }


    public List<PoolResponseDto> getPoolsWithUserMark(Long userId) {
        List<Pool> pools = poolRepository.findAllWithUserMark(userId);
        return pools.stream().map(p -> PoolResponseDto.from(p, userId)).toList();

    }

    public PoolWithSwimmingTimeResponseDto getPoolWithName(String poolName) {
        // 오늘 요일, 예시) 월요일
        String nowDayOfWeek = LocalDate.now().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREAN);
        return PoolWithSwimmingTimeResponseDto.from(
                poolRepository.getPoolWithName(poolName, Week.from(nowDayOfWeek))
                        .orElseThrow(() -> new IllegalArgumentException("Bad Request")),
                nowDayOfWeek
        );
    }

}
