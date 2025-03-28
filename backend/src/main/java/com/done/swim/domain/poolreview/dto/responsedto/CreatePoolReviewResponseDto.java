package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CreatePoolReviewResponseDto {

    private final String poolName;
    private final String content;
    private final LocalDateTime createAt;

    /**
     * 리뷰 생성 응답 DTO
     *
     * @param entity 리뷰 엔티티
     */
    public static CreatePoolReviewResponseDto from(PoolReview entity) {
        return CreatePoolReviewResponseDto.builder()
                .poolName(entity.getPool().getName())
                .content(entity.getContent())
                .createAt(entity.getCreatedAt())
                .build();
    }
}
