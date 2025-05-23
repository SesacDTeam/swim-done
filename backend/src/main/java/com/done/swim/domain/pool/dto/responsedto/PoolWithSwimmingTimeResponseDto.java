package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;
import java.util.List;

@Getter
@Builder
public class PoolWithSwimmingTimeResponseDto {
    private Long id;
    private String name;
    private String address;
    private String dayOfWeek;
    private List<SwimmingTimeResponseDto> swimmingTimes;

    /**
     * 특정 수영자 요약 정보
     */
    public static PoolWithSwimmingTimeResponseDto from(Pool entity, String nowDayOfWeek) {

        return PoolWithSwimmingTimeResponseDto.builder()
          .id(entity.getId())
          .name(entity.getName())
          .address(entity.getAddress())
          .dayOfWeek(nowDayOfWeek)
          .swimmingTimes(entity.getSwimmingTimes().stream()
            .filter((element) -> element.getDayOfWeek().getKoreanName().equals(nowDayOfWeek))
            .map(SwimmingTimeResponseDto::from).toList()
          )
          .build();

    }

    @Getter
    @Builder
    private static class SwimmingTimeResponseDto {
        @JsonFormat(pattern = "HH:mm")
        private LocalTime startTime;
        @JsonFormat(pattern = "HH:mm")
        private LocalTime endTime;

        public static SwimmingTimeResponseDto from(SwimmingTime entity) {
            return SwimmingTimeResponseDto.builder()
                    .startTime(entity.getStartTime())
                    .endTime(entity.getEndTime())
                    .build();
        }

    }

}
