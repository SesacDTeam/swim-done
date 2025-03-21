package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PoolWithSwimmingTimeResponseDto {
    private String name;
    private String address;
    private List<?> swimmingTimes;

    public static PoolWithSwimmingTimeResponseDto from(Pool entity) {
        return PoolWithSwimmingTimeResponseDto.builder()
                .name(entity.getName())
                .address(entity.getAddress())
                .swimmingTimes(entity.getSwimmingTimes().stream().map(st ->))
                .build();

    }
}
