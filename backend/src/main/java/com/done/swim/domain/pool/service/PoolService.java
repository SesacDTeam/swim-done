package com.done.swim.domain.pool.service;

import com.done.swim.domain.pool.dto.responseDto.PoolDetailResponseDto;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolService {

  private final PoolRepository poolRepository;

  public PoolDetailResponseDto poolsDetailPage(Long id) {
    Pool pool = poolRepository.findByIdWithCommentAndTimes(id)
        .orElseThrow(() -> new IllegalArgumentException("해당 수영장이 존재하지 않습니다."));

    return PoolDetailResponseDto.from(pool);
  }
}
