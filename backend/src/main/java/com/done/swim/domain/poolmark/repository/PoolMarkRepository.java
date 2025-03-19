package com.done.swim.domain.poolmark.repository;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolMarkRepository extends JpaRepository<PoolMark, Long> {

  boolean existsByUserAndPool(User user, Pool pool);

  Page<PoolMark> findByUserId(Long userId, Pageable pageable);
}
