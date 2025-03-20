package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@Builder
public class SwimmingTimeSubDtoOfPoolResponseDto {
    private LocalTime startTime;
    private LocalTime endTime;
    private String dayOfWeek;

    public static SwimmingTimeSubDtoOfPoolResponseDto from(SwimmingTime entity) {
        return SwimmingTimeSubDtoOfPoolResponseDto.builder()
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .dayOfWeek(entity.getDayOfWeek().getKoreanName())
                .build();
    }
}
