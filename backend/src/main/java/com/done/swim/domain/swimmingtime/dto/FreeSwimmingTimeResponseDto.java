package com.done.swim.domain.swimmingtime.dto;

import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import java.time.LocalTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FreeSwimmingTimeResponseDto {

  private LocalTime startTime;
  private LocalTime endTime;

  public static FreeSwimmingTimeResponseDto from(SwimmingTime entity) {
    return FreeSwimmingTimeResponseDto.builder()
        .startTime(entity.getStartTime())
        .endTime(entity.getEndTime())
        .build();
  }
}
