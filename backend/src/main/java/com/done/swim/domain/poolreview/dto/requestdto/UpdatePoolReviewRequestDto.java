package com.done.swim.domain.poolreview.dto.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

/**
 * 리뷰 수정 Request DTO
 */
@Getter
public class UpdatePoolReviewRequestDto {

    @NotBlank
    @Length(max = 100)
    private String content;
}
