package com.done.swim.domain.poolreview.dto.responseDto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PoolDetailPageReviewResponseDto {

  private final String content;
  private final LocalDateTime createdAt;

  public static PoolDetailPageReviewResponseDto from(PoolReview dto) {
    return PoolDetailPageReviewResponseDto.builder()
        .content(dto.getContent())
        .createdAt(dto.getCreatedAt())
        .build();
  }
}
