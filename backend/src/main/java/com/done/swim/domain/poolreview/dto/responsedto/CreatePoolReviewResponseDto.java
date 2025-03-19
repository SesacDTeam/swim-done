package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public class CreatePoolReviewResponseDto {

  private final String poolName;
  private final String content;
  private final LocalDateTime timestamp;

  public static CreatePoolReviewResponseDto from(PoolReview entity) {
    return CreatePoolReviewResponseDto.builder()
        .poolName(entity.getPool().getName())
        .content(entity.getContent())
        .timestamp((entity.getUpdatedAt() != null) ? entity.getUpdatedAt() : entity.getCreatedAt())
        .build();
  }
}
