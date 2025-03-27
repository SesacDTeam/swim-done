package com.done.swim.domain.poolreview.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.requestdto.UpdatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.MyReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.getReviewBeforeDateResponseDto;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.repository.PoolReviewRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ForBiddenException;
import com.done.swim.global.exception.ResourceNotFoundException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolReviewService {

  private final PoolReviewRepository poolReviewRepository;
  private final PoolRepository poolRepository;

  @Transactional
  public CreatePoolReviewResponseDto createReview(Long poolId,
      CreatePoolReviewRequestDto requestDto,
      User user
  ) {
    Pool pool = poolRepository.findById(poolId)
        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND));

    PoolReview poolReview = requestDto.toEntity(pool, user);
    poolReviewRepository.save(poolReview);

    return CreatePoolReviewResponseDto.from(poolReview);

  }

  public Map<String, Object> getMyReviews(Long userId, Pageable pageable) {
    Page<PoolReview> poolReviews = poolReviewRepository.findAllByUserId(userId, pageable);

    Page<MyReviewResponseDto> response = poolReviews.map(MyReviewResponseDto::from);

    long totalCount = poolReviews.getTotalElements();

    boolean hasNext = poolReviews.hasNext();

    Map<String, Object> responseBody = new HashMap<>();
    responseBody.put("reviews", response.getContent());
    responseBody.put("totalCount", totalCount);
    responseBody.put("hasNext", hasNext);

    return responseBody;
  }

  public getReviewBeforeDateResponseDto getReviewBeforeDate(Long reviewId,
      Long userID) {
    PoolReview poolReview = poolReviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

    if (poolReview.getUser().getId() != userID) {
      throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
    }

    return getReviewBeforeDateResponseDto.from(poolReview);
  }

  @Transactional
  public void updateReview(Long reviewId,
      UpdatePoolReviewRequestDto requestDto,
      User user) {
    System.out.println("updateService");

    PoolReview poolReview = poolReviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

    if (poolReview.getUser().getId() != user.getId()) {
      throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
    }

    poolReview.setContent(requestDto.getContent());

  }

  @Transactional
  public void deleteReview(Long reviewId, User user) {
    PoolReview poolReview = poolReviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

    if (poolReview.getUser().getId() != user.getId()) {
      throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
    }

    poolReviewRepository.deleteById(reviewId);
  }
}

