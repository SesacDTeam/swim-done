package com.done.swim.domain.swimmingtime.entity;

import lombok.Getter;

import java.util.HashMap;
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

    private final String koreanName;

    Week(String koreanName) {
        this.koreanName = koreanName;
    }

    public static Week from(String dayOfWeek) {
        Week week = lookup.get(dayOfWeek);
        if (week == null) {
            throw new IllegalArgumentException("Unknown day: " + dayOfWeek);
        }
        return week;
    }

}