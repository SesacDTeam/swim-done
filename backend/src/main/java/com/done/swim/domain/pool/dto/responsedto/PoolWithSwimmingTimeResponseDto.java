package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;
import java.util.List;

@Getter
@Builder
public class PoolWithSwimmingTimeResponseDto {
    private String name;
    private String address;
    private String dayOfWeek;
    private List<SwimmingTimeResponseDto> swimmingTimes;

    public static PoolWithSwimmingTimeResponseDto from(Pool entity, String nowDayOfWeek) {

        return PoolWithSwimmingTimeResponseDto.builder()
                .name(entity.getName())
                .address(entity.getAddress())
                .dayOfWeek(nowDayOfWeek)
                .swimmingTimes(entity.getSwimmingTimes().stream().map(SwimmingTimeResponseDto::from).toList())
                .build();

    }

    @Getter
    @Builder
    private static class SwimmingTimeResponseDto {
        private LocalTime startTime;
        private LocalTime endTime;

        public static SwimmingTimeResponseDto from(SwimmingTime entity) {
            return SwimmingTimeResponseDto.builder()
                    .startTime(entity.getStartTime())
                    .endTime(entity.getEndTime())
                    .build();
        }

    }

}
