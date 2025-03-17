package com.done.swim.domain.poolmark.repository;

import com.done.swim.domain.poolmark.entity.PoolMark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolMarkRepository extends JpaRepository<PoolMark, Long> {
}
