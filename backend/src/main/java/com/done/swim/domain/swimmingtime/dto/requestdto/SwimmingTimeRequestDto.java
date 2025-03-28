package com.done.swim.domain.swimmingtime.dto.requestdto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import com.done.swim.domain.swimmingtime.entity.Week;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SwimmingTimeRequestDto {
    @JsonFormat(pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalTime endTime;
    private Week dayOfWeek;

    /**
     * DTO -> Entity
     *
     * @param entity 수영장 엔티티
     */
    public SwimmingTime toEntity(Pool entity) {
        return SwimmingTime.builder()
                .pool(entity)
                .startTime(LocalTime.from(startTime))
                .endTime(LocalTime.from(endTime))
                .dayOfWeek(dayOfWeek)
                .build();
    }
}
