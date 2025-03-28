package com.done.swim.domain.poolmark.dto;

import com.done.swim.domain.poolmark.entity.PoolMark;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class PoolMarkListResponseDto {
    private List<PoolMarkResponseDto> poolMarks;
    private Boolean hasNext;

    /**
     * 찜 목록
     *
     * @param entityPage 페이징 처리된 찜-엔티티
     */
    public static PoolMarkListResponseDto from(Page<PoolMark> entityPage) {
        List<PoolMarkResponseDto> poolMarkResponseDtos = entityPage.getContent().stream()
                .map(PoolMarkResponseDto::from)
                .toList();

        return PoolMarkListResponseDto.builder()
                .poolMarks(poolMarkResponseDtos)
                .hasNext(entityPage.hasNext())
                .build();
    }
}
