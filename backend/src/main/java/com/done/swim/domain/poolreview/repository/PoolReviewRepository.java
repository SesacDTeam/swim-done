package com.done.swim.domain.poolreview.repository;

import com.done.swim.domain.poolreview.entity.PoolReview;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolReviewRepository extends JpaRepository<PoolReview, Long> {

  List<PoolReview> findAllByUserId(Long userId);
}
