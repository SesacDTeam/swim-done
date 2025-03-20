package com.done.swim.domain.poolreview.dto.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class UpdatePoolReviewRequestDto {

  @NotBlank
  @Length(max = 100)
  private String content;
}
