package com.done.swim.domain.poolmark.dto;

import com.done.swim.domain.poolmark.entity.PoolMark;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class PoolMarkListResponseDto {
  private List<PoolMarkResponseDto> poolMarks;
  private Boolean hasNext;

  public static PoolMarkListResponseDto from(Page<PoolMark> poolMarkPage) {
    List<PoolMarkResponseDto> poolMarkResponseDtos = poolMarkPage.getContent().stream()
      .map(PoolMarkResponseDto::from)
      .toList();

    return PoolMarkListResponseDto.builder()
      .poolMarks(poolMarkResponseDtos)
      .hasNext(poolMarkPage.hasNext())
      .build();
  }
}
