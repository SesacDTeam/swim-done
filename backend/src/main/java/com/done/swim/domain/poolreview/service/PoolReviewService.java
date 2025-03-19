package com.done.swim.domain.poolreview.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.repository.PoolReviewRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
        .orElseThrow(() -> new IllegalArgumentException("해당 수영장이 존재하지 않습니다."));

    // TODO: 토큰 구현이 안되어있어서 더미 데이터로 테스트
    User user = userRepository.findById(requestDto.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

    PoolReview poolReview = requestDto.toEntity(pool, user);
    poolReviewRepository.save(poolReview);

    return CreatePoolReviewResponseDto.from(poolReview);

  }
}