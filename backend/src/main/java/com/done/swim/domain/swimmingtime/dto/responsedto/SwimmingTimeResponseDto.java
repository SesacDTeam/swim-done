package com.done.swim.domain.swimmingtime.dto.responsedto;

import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@Builder
public class SwimmingTimeResponseDto {

    private LocalTime startTime;
    private LocalTime endTime;
    private String dayOfWeek;

    public static SwimmingTimeResponseDto from(SwimmingTime entity) {
        return SwimmingTimeResponseDto.builder()
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .dayOfWeek(entity.getDayOfWeek().getKoreanName())
                .build();
    }
}
