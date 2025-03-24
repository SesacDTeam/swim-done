package com.done.swim.domain.poolreview.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.requestdto.UpdatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.MyReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.UpdatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.repository.PoolReviewRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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
  private final UserRepository userRepository;

  @Transactional
  public CreatePoolReviewResponseDto createReview(Long poolId,
      CreatePoolReviewRequestDto requestDto) {

    //TODO : GlobalException 확정 후 수정예정
    Pool pool = poolRepository.findById(poolId)
        .orElseThrow(() -> new EntityNotFoundException("해당 수영장이 존재하지 않습니다."));

    // TODO: 토큰 구현이 안되어있어서 더미 데이터로 테스트
    User user = userRepository.findById(requestDto.getUserId())
        .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 유저입니다."));

    PoolReview poolReview = requestDto.toEntity(pool, user);
    poolReviewRepository.save(poolReview);

    return CreatePoolReviewResponseDto.from(poolReview);

  }

  public Map<String, Object> getMyReviews(Long userId, Pageable pageable) {
    Page<PoolReview> poolReviews = poolReviewRepository.findAllByUserId(userId, pageable);

    Page<MyReviewResponseDto> response = poolReviews.map(MyReviewResponseDto::from);

    long totalCount = poolReviews.getTotalElements();

    Map<String, Object> responseBody = new HashMap<>();
    responseBody.put("reviews", response.getContent());
    responseBody.put("totalCount", totalCount);

    return responseBody;
  }

  @Transactional
  public UpdatePoolReviewResponseDto updateReview(Long reviewId,
      UpdatePoolReviewRequestDto requestDto) {
    //TODO : GlobalException 확정 후 수정예정
    PoolReview poolReview = poolReviewRepository.findById(reviewId)
        .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 리뷰입니다."));

    poolReview.setContent(requestDto.getContent());

    return UpdatePoolReviewResponseDto.from(poolReview);
  }
}

