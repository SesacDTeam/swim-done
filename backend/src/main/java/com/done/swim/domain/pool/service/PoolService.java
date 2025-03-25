package com.done.swim.domain.pool.service;

import com.done.swim.domain.pool.dto.responsedto.PoolDetailResponseDto;
import com.done.swim.domain.pool.dto.responsedto.PoolResponseDto;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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


  public List<PoolResponseDto> getPoolsWithUserMark(Long userId) {
    List<Pool> pools = poolRepository.findAllWithUserMark(userId);
    return pools.stream().map(p -> PoolResponseDto.from(p, userId)).toList();

  }

}
