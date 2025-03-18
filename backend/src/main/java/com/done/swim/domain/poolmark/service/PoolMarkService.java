package com.done.swim.domain.poolmark.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.poolmark.repository.PoolMarkRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolMarkService {
  private final PoolMarkRepository poolMarkRepository;
  private final PoolRepository poolRepository;
  private final UserRepository userRepository;

  public void createPoolMark(Long poolId) {
    Pool pool = poolRepository.findById(poolId)
      .orElseThrow(() -> new IllegalArgumentException("수영장이 없습니다."));

    // 토큰 구현이 안되어있어서 임시로(토큰 구현 후에는 User를 파라미터로 받을 예정)
    User user = userRepository.findById(1L)
      .orElseThrow(() -> new IllegalArgumentException("수영장이 없습니다."));

    PoolMark poolMark = PoolMark.builder().user(user).pool(pool).build();
    poolMarkRepository.save(poolMark);
  }
}
