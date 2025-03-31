package com.done.swim.domain.poolreview.dto.responsedto;

import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@Builder
public class GroupedSwimmingTimeByWeekResponseDtoItem {
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    public static GroupedSwimmingTimeByWeekResponseDtoItem from(SwimmingTime swimmingTime) {
        return GroupedSwimmingTimeByWeekResponseDtoItem.builder()
                .startTime(swimmingTime.getStartTime())
                .endTime(swimmingTime.getEndTime())
                .build();
    }
}
