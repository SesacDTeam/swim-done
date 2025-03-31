package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolreview.dto.responsedto.GroupedSwimmingTimeByWeekResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.GroupedSwimmingTimeByWeekResponseDtoItem;
import com.done.swim.domain.swimmingtime.dto.responsedto.SwimmingTimeResponseDto;
import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import com.done.swim.domain.swimmingtime.entity.Week;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;
import java.util.*;
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
    //    private final GroupedSwimmingTimeByWeekResponseDto swimmingTimes;
    private final List<PoolDetailReviewResponseDto> reviews;

    /**
     * 특정 수영장의 정보
     */
    public static PoolDetailResponseDto from(Pool pool) {

        Map<LocalTime, GroupedSwimmingTimeResponseDto> groupedSwimmingTimes = getGroupedSwimmingTimes(pool.getSwimmingTimes());

        List<GroupedSwimmingTimeResponseDto> sortedSwimmingTimes = sortedSwimmingTimes(groupedSwimmingTimes);

        GroupedSwimmingTimeByWeekResponseDto groupedSwimmingTimesByWeek = getGroupedSwimmingTimesByWeek(pool.getSwimmingTimes());

        return PoolDetailResponseDto.builder()
                .name(pool.getName())
                .address(pool.getAddress())
                .latitude(pool.getLatitude())
                .longitude(pool.getLongitude())
                .additionalInfo(pool.getAdditionalInfo())
                .parking(pool.getParking())
                .link(pool.getLink())
//                .swimmingTimes(groupedSwimmingTimesByWeek)
                .swimmingTimes(sortedSwimmingTimes)
                .reviews(
                        pool.getPoolReviews().stream()
                                .map(PoolDetailReviewResponseDto::from)
                                .toList()
                )
                .build();
    }

    static GroupedSwimmingTimeByWeekResponseDto getGroupedSwimmingTimesByWeek(List<SwimmingTime> swimmingTimes) {


        Map<Week, List<GroupedSwimmingTimeByWeekResponseDtoItem>> result = new HashMap<>();
        for (SwimmingTime swimmingTime : swimmingTimes) {
            //swimmingTime의 요일로 리스트를 꺼냄 없으면 리스트 생성

            List<GroupedSwimmingTimeByWeekResponseDtoItem> times = result.getOrDefault(swimmingTime.getDayOfWeek(), new ArrayList<>());
            times.add(GroupedSwimmingTimeByWeekResponseDtoItem.from(swimmingTime));
            times = times.stream().sorted(Comparator.comparing(GroupedSwimmingTimeByWeekResponseDtoItem::getStartTime)).collect(Collectors.toList());
            result.put(swimmingTime.getDayOfWeek(), times);

        }
        return GroupedSwimmingTimeByWeekResponseDto.builder()
                .days(result)
                .build();


    }

    /**
     * 시간 데이터 그룹핑
     *
     * @param swimmingTimes 자유 수영 시간 엔티티
     */
    private static Map<LocalTime, GroupedSwimmingTimeResponseDto> getGroupedSwimmingTimes(List<SwimmingTime> swimmingTimes) {
        return swimmingTimes.stream().map(SwimmingTimeResponseDto::from) // entity -> 응답 DTO로 변경
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
                        (existing, replacement) -> { // 존재 하는 old_value에 새로운 new_value를 추가
                            existing.getDays().putAll(replacement.getDays());
                            return existing;
                        }
                ));
    }

    /**
     * startTime 기준 오름차순 정렬
     *
     * @param groupedSwimmingTimes 그룹화된 시간데이터
     */
    private static List<GroupedSwimmingTimeResponseDto> sortedSwimmingTimes(Map<LocalTime, GroupedSwimmingTimeResponseDto> groupedSwimmingTimes) {
        return groupedSwimmingTimes.values().stream()
                .sorted( // 시작 시간 기준 오름차순 정렬
                        Comparator.comparing(GroupedSwimmingTimeResponseDto::getStartTime)
                ).toList();
    }

    @Getter
    @Builder
    static class GroupedSwimmingTimeResponseDto {

        private final Map<Week, String> days;
        @JsonFormat(pattern = "HH:mm")
        private LocalTime startTime;
        @JsonFormat(pattern = "HH:mm")
        private LocalTime endTime;


    }
}

