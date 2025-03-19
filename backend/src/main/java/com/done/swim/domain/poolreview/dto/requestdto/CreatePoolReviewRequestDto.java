package com.done.swim.domain.poolreview.dto.requestdto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolreview.entity.PoolReview;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CreatePoolReviewRequestDto {

  @NotBlank
  private String content;
//  private Long userId;

  public PoolReview toEntity(Pool pool) {
    return PoolReview.builder()
        .pool(pool)
//        .user(userId)
        .content(content)
        .build();
  }
}
