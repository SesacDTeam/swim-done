package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UpdatePoolReviewResponseDto {

    private final String poolName;
    private final String content;
    private final LocalDateTime updateAt;

    /**
     * 리뷰 수정
     *
     * @param entity 리뷰 엔티티
     */
    public static UpdatePoolReviewResponseDto from(PoolReview entity) {
        return UpdatePoolReviewResponseDto.builder()
                .poolName(entity.getPool().getName())
                .content(entity.getContent())
                .updateAt(entity.getUpdatedAt())
                .build();
    }
}
