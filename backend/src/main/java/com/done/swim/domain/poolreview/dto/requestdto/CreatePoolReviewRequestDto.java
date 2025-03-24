package com.done.swim.domain.poolreview.dto.requestdto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.user.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class CreatePoolReviewRequestDto {

  @NotBlank
  @Length(max = 100)
  private String content;

  public PoolReview toEntity(Pool pool, User userDate) {
    return PoolReview.builder()
        .pool(pool)
        .user(userDate)
        .content(content)
        .build();
  }
}
