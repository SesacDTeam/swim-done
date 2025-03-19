package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreatePoolReviewResponseDto {

  private final String poolName;
  private final String content;
  private final LocalDateTime createAt;

  public static CreatePoolReviewResponseDto from(PoolReview entity) {
    return CreatePoolReviewResponseDto.builder()
        .poolName(entity.getPool().getName())
        .content(entity.getContent())
        .createAt(entity.getCreatedAt())
        .build();
  }
}
