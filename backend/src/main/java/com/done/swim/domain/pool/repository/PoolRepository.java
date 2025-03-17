package com.done.swim.domain.pool.repository;

import com.done.swim.domain.pool.entity.Pool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolRepository extends JpaRepository<Pool, Long> {
}
