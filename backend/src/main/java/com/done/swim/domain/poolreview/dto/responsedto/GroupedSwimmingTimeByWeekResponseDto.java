package com.done.swim.domain.poolreview.dto.responsedto;


import com.done.swim.domain.swimmingtime.entity.Week;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class GroupedSwimmingTimeByWeekResponseDto {
    private final Map<Week, List<GroupedSwimmingTimeByWeekResponseDtoItem>> days;
}
