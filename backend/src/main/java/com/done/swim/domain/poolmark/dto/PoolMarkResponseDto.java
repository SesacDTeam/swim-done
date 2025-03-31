package com.done.swim.domain.poolmark.dto;

import com.done.swim.domain.poolmark.entity.PoolMark;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PoolMarkResponseDto {
    private Long id;
    private String name;
    private String address;
    private Boolean mark;

    /**
     * PoolMarkListResponseDto의 요소
     *
     * @param entity 찜-엔티티
     */
    public static PoolMarkResponseDto from(PoolMark entity) {
        return PoolMarkResponseDto.builder()
                .id(entity.getPool().getId())
                .name(entity.getPool().getName())
                .address(entity.getPool().getAddress())
                .mark(true)
                .build();
    }
}
