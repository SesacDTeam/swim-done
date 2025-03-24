package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Getter
@Builder
public class PoolWithSectionResponseDto {

    private Long id;
    private String address;
    private String section;
    private String name;
    private Double latitude;
    private Double longitude;
    private Boolean mark;

    public static PoolWithSectionResponseDto from(Pool entity, Long userId) {
        return PoolWithSectionResponseDto.builder()
                .id(entity.getId())
                .address(entity.getAddress())
                .section(entity.getSection())
                .name(entity.getName())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .mark(entity.getPoolMarks().stream()
                        .anyMatch(pm -> Objects.equals(pm.getUser().getId(), userId))
                )
                .build();
    }
}
