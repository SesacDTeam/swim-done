package com.done.swim.domain.swimmingtime.dto.responsedto;

import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import com.done.swim.domain.swimmingtime.entity.Week;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@Builder
public class SwimmingTimeResponseDto {
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private Week dayOfWeek;

    public static SwimmingTimeResponseDto from(SwimmingTime entity) {
        return SwimmingTimeResponseDto.builder()
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .dayOfWeek(entity.getDayOfWeek())
                .build();
    }
}
