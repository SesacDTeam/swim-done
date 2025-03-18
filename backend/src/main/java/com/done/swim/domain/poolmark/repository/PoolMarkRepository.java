package com.done.swim.domain.poolmark.repository;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolMarkRepository extends JpaRepository<PoolMark, Long> {
  boolean existsByUserAndPool(User user, Pool pool);
}
