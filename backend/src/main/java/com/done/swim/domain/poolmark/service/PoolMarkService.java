package com.done.swim.domain.poolmark.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolmark.dto.PoolMarkListResponseDto;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.poolmark.repository.PoolMarkRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolMarkService {

  private final PoolMarkRepository poolMarkRepository;
  private final PoolRepository poolRepository;
  private final UserRepository userRepository;

  @Transactional
  public void createPoolMark(Long poolId, User user) {
    Pool pool = fetchPool(poolId);

    PoolMark alreadyMarkedPool = poolMarkRepository.findByUserAndPool(user, pool);

    if (alreadyMarkedPool != null) {
      throw new IllegalStateException("이미 찜한 수영장입니다.");
    }

    PoolMark poolMark = PoolMark.builder().user(user).pool(pool).build();
    poolMarkRepository.save(poolMark);
  }

  public PoolMarkListResponseDto getMyPoolMark(Pageable pageable, Long userId) {
    Page<PoolMark> poolMarkPage = poolMarkRepository.findByUserId(userId, pageable);

    return PoolMarkListResponseDto.from(poolMarkPage);
  }

  @Transactional
  public void deleteMyPoolMark(Long poolId, User user) {
    Pool pool = fetchPool(poolId);

    PoolMark alreadyMarkedPool = poolMarkRepository.findByUserAndPool(user, pool);

    if (alreadyMarkedPool == null) {
      throw new IllegalStateException("찜한 수영장이 없습니다.");
    }

    if (alreadyMarkedPool.getUser().getId() != user.getId()) {
      throw new IllegalStateException("권한이 없습니다.");
    }

    poolMarkRepository.deleteById(alreadyMarkedPool.getId());
  }

  private Pool fetchPool(Long poolId) {
    return poolRepository.findById(poolId)
      .orElseThrow(() -> new IllegalArgumentException("수영장이 없습니다."));
  }
}
