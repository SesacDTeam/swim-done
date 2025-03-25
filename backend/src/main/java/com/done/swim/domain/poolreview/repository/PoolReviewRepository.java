package com.done.swim.domain.poolreview.repository;

import com.done.swim.domain.poolreview.entity.PoolReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolReviewRepository extends JpaRepository<PoolReview, Long> {

  Page<PoolReview> findAllByUserId(Long userId, Pageable pageable);

}
