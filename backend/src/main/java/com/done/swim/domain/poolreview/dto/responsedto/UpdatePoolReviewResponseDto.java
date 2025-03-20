package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdatePoolReviewResponseDto {

  private final String poolName;
  private final String content;
  private final LocalDateTime updateAt;

  public static UpdatePoolReviewResponseDto from(PoolReview entity) {
    return UpdatePoolReviewResponseDto.builder()
        .poolName(entity.getPool().getName())
        .content(entity.getContent())
        .updateAt(entity.getUpdatedAt())
        .build();
  }
}
