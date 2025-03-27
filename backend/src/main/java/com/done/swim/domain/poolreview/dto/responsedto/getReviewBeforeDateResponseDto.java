package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class getReviewBeforeDateResponseDto {

  private final String poolName;
  private final String content;


  public static getReviewBeforeDateResponseDto from(PoolReview entity) {
    return getReviewBeforeDateResponseDto.builder()
        .poolName(entity.getPool().getName())
        .content(entity.getContent())
        .build();
  }
}
