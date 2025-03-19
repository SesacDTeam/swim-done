package com.done.swim.domain.poolreview.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.repository.PoolReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolReviewService {

  private final PoolReviewRepository poolReviewRepository;
  private final PoolRepository poolRepository;


  //유저아이디 추출방법 알아서 추후 유저아이디도 추가로 저장해야함
  @Transactional
  public CreatePoolReviewResponseDto createReview(Long poolId,
      CreatePoolReviewRequestDto requestDto) {

    //GlobalException 확정 후 수정예정
    Pool pool = poolRepository.findById(poolId)
        .orElseThrow(() -> new IllegalArgumentException("해당 수영장이 존재하지 않습니다."));

    if (requestDto.getContent().length() > 30) {
      throw new IllegalArgumentException("리뷰 내용은 30자 이하로 작성해야 합니다.");
    }

    PoolReview poolReview = requestDto.toEntity(pool);
    poolReviewRepository.save(poolReview);

    return CreatePoolReviewResponseDto.from(poolReview);

  }
}