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
  private final LocalDateTime updatedAt;

  public static PoolDetailReviewResponseDto from(PoolReview entity) {

    return PoolDetailReviewResponseDto.builder()
      .authorId(entity.getUser().getId())
      .authorNickname(entity.getUser().getNickname())
      .content(entity.getContent())
      .createdAt(entity.getCreatedAt())
      .updatedAt(entity.getUpdatedAt())
      .build();
  }
}
