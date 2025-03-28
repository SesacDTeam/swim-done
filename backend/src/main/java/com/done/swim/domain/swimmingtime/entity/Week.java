package com.done.swim.domain.swimmingtime.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;


@Getter
public enum Week {
    MON("월요일"), TUE("화요일"), WED("수요일"), THU("목요일"),
    FRI("금요일"), SAT("토요일"), SUN("일요일");

    private static final Map<String, Week> lookup = new HashMap<>();

    // 정적 블록에서 한 번만 초기화
    static {
        for (Week week : Week.values()) {
            lookup.put(week.koreanName, week);
        }
    }

    /**
     * 응답 예시) 금요일
     */
    @JsonValue
    private final String koreanName;

    Week(String koreanName) {
        this.koreanName = koreanName;
    }

    /**
     * 요청 데이터에 Enum 과 매핑
     *
     * @param dayOfWeek 요일
     */
    @JsonCreator
    public static Week from(String dayOfWeek) {
        Week week = lookup.get(dayOfWeek);
        if (week == null) {
            throw new IllegalArgumentException("Unknown day: " + dayOfWeek);
        }
        return week;
    }

    /**
     * @return String 오늘 날짜
     * <p>
     * 응답 예시) 금요일
     * </p>
     */
    public static String getNowDayOfWeekInKorean() {
        return LocalDate.now().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREAN);
    }

}