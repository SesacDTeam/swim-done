package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyReviewResponseDto {

  private final Long reviewId;
  private final String poolName;
  private final String content;
  private final LocalDateTime timestamp;

  public static MyReviewResponseDto from(PoolReview entity) {
    return MyReviewResponseDto.builder()
        .reviewId(entity.getId())
        .poolName(entity.getPool().getName())
        .content(entity.getContent())
        .timestamp((entity.getUpdatedAt() != null) ? entity.getUpdatedAt() : entity.getCreatedAt())
        .build();
  }
}
