package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.dto.responsedto.SwimmingTimeResponseDto;
import com.done.swim.domain.swimmingtime.entity.Week;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Builder
public class PoolDetailResponseDto {

    private final String name;
    private final String address;
    private final Double latitude;
    private final Double longitude;
    private final String additionalInfo;
    private final String parking;
    private final String link;
    private final List<GroupedSwimmingTimeResponseDto> swimmingTimes;
    private final List<PoolDetailReviewResponseDto> reviews;

    /**
     * 특정 수영장의 정보
     */
    public static PoolDetailResponseDto from(Pool pool) {

        Map<LocalTime, GroupedSwimmingTimeResponseDto> groupedTimes =
                pool.getSwimmingTimes().stream().map(SwimmingTimeResponseDto::from) // entity -> 응답 DTO로 변경
                        .collect(Collectors.toMap( // 시간대 별로 그룹핑
                                SwimmingTimeResponseDto::getStartTime, // key
                                time -> { // value
                                    Map<Week, String> daysMap = new HashMap<>();
                                    daysMap.put(time.getDayOfWeek(), "자유 수영");
                                    return GroupedSwimmingTimeResponseDto.builder()
                                            .startTime(time.getStartTime())
                                            .endTime(time.getEndTime())
                                            .days(daysMap)
                                            .build();
                                },
                                (existing, replacement) -> { // 존재 하는 old_value를 새로운 new_value로 변경
                                    existing.getDays().putAll(replacement.getDays());
                                    return existing;
                                }
                        ));

        List<GroupedSwimmingTimeResponseDto> sortedSwimmingTimes =
                groupedTimes.values().stream()
                        .sorted( // 시작 시간 기준 오름차순 정렬
                                Comparator.comparing(GroupedSwimmingTimeResponseDto::getStartTime)
                        ).toList();

        return PoolDetailResponseDto.builder()
                .name(pool.getName())
                .address(pool.getAddress())
                .latitude(pool.getLatitude())
                .longitude(pool.getLongitude())
                .additionalInfo(pool.getAdditionalInfo())
                .parking(pool.getParking())
                .link(pool.getLink())
                .swimmingTimes(sortedSwimmingTimes)
                .reviews(
                        pool.getPoolReviews().stream()
                                .map(PoolDetailReviewResponseDto::from)
                                .toList()
                )
                .build();
    }


    @Getter
    @Builder
    public static class GroupedSwimmingTimeResponseDto {

        private final Map<Week, String> days;
        @JsonFormat(pattern = "HH:mm")
        private LocalTime startTime;
        @JsonFormat(pattern = "HH:mm")
        private LocalTime endTime;
    }
}

