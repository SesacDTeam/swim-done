package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.poolreview.entity.PoolReview;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Getter
@Builder
public class MyReviewResponseDto {

    private long totalCount;
    private boolean hasNext;
    private List<MyReviewResponseDtoItem> reviews;

    public static MyReviewResponseDto from(Page<PoolReview> pageEntity) {
        return MyReviewResponseDto.builder()
                .totalCount(pageEntity.getTotalElements())
                .hasNext(pageEntity.hasNext())
                .reviews(pageEntity.getContent().stream().map(
                        MyReviewResponseDtoItem::from
                ).toList())
                .build();
    }

    @Getter
    @Builder
    private static class MyReviewResponseDtoItem {
        private Long reviewId;
        private String poolName;
        private String content;
        private LocalDateTime createdAt;

        private static MyReviewResponseDtoItem from(PoolReview poolReview) {
            return MyReviewResponseDtoItem.builder()
                    .reviewId(poolReview.getId())
                    .poolName(poolReview.getPool().getName())
                    .content(poolReview.getContent())
                    .build();
        }

    }
}
