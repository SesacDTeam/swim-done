package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PoolDetailReviewResponseDto {

  private final Long authorId;
  private final String authorNickname;
  private final String content;
  private final LocalDateTime createdAt;
  private final LocalDateTime updatedA;

  public static PoolDetailReviewResponseDto from(PoolReview dto) {

    return PoolDetailReviewResponseDto.builder()
      .authorId(dto.getUser().getId())
      .authorNickname(dto.getUser().getNickname())
      .content(dto.getContent())
      .createdAt(dto.getCreatedAt())
      .updatedA(dto.getUpdatedAt())
      .build();
  }
}
