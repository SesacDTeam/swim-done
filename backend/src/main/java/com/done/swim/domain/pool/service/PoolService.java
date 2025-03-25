package com.done.swim.domain.pool.service;

import com.done.swim.domain.pool.dto.responsedto.PoolDetailResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSectionResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolWithSwimmingTimeResponseDto;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
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
      .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND));
    return PoolDetailResponseDto.from(pool);
  }

    // TODO : 지역구 좌표정보 조회
    // 새로운 서비스 클래스로 분리 예정
    // Repository 도 만들어야 함
//    public List<CoordinatesResponseDto> getCoordinates() {
//        List<Coordinates> coordinates = poolRepository.findCoordinates();
//        return coordinates.stream().map(CoordinatesResponseDto::from).toList();
//    }

    public PoolWithSwimmingTimeResponseDto getPoolWithName(String poolName) {
        // 오늘 요일, 예시) 월요일
        String nowDayOfWeek = LocalDate.now().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREAN);
        return PoolWithSwimmingTimeResponseDto.from(
                poolRepository.getPoolWithName(poolName, Week.from(nowDayOfWeek))
                        .orElseThrow(() -> new IllegalArgumentException("Bad Request")),
                nowDayOfWeek
        );
    }

    public List<PoolWithSectionResponseDto> getPoolsWithSection(String section, long userId) {
        List<Pool> pools = poolRepository.findBySectionWithUserId(section, userId);

        return pools.stream().map(p -> PoolWithSectionResponseDto.from(p, userId)).toList();
    }
}
