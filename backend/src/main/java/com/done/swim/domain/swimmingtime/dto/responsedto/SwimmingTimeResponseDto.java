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

    /**
     * 특정 수영장의 자유 수영 시간, 요일
     *
     * @param entity 자유 수영 시간 엔티티
     * @return [
     * {
     * "startTime" : "08:00",
     * "endTime" : "08:50",
     * "dayOfWeek" : "MON
     * }
     * ]
     */
    public static SwimmingTimeResponseDto from(SwimmingTime entity) {
        return SwimmingTimeResponseDto.builder()
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .dayOfWeek(entity.getDayOfWeek())
                .build();
    }
}
