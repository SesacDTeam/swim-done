package com.done.swim.domain.poolreview.service;

import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.repository.PoolReviewRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PoolReviewService {

  private final PoolReviewRepository poolReviewRepository;
  private final PoolRepository poolRepository;


  public List<PoolReview> getMyReviews(Long userId) {
    return poolReviewRepository.findAllByUserId(userId);
  }
}
