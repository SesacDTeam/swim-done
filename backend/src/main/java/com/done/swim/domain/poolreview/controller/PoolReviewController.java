package com.done.swim.domain.poolreview.controller;

import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.service.PoolReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PoolReviewController {

  private final PoolReviewService poolReviewService;

  //유저아이디를 가져올 수 있으면 수정예정
  @GetMapping("/my/review/{userId}")
  public List<PoolReview> getMyReviews(@PathVariable Long userId) {
    return poolReviewService.getMyReviews(userId);
  }
}
