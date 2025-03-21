package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Getter
@Builder
public class PoolResponseDto {
    // v 찜여부 => 리스트 바
    // v수영장 이름 => 리스트 바, 인포윈도우, 마커
    // v지역구 이름 => 리스트 바, 클러스터
    // v주소 => 리스트 바, 인포윈도우
    // v당일 자유수영 시간 => 인포윈도우
    // v수영장 식별 아이디 => 리스트바, 찜, 인포윈도우
    // v좌표 => 마커
    private Long id;
    private String address;
    private String section;
    private String name;
    private Double latitude;
    private Double longitude;
    private Boolean mark;

    public static PoolResponseDto from(Pool entity, Long userId) {
        return PoolResponseDto.builder()
                .id(entity.getId())
                .address(entity.getAddress())
                .section(entity.getSection())
                .name(entity.getName())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .mark(entity.getPoolMarks().stream()
                        .anyMatch(pm -> Objects.equals(pm.getUser().getId(), userId))
                )
                .build();
    }

}
