package com.done.swim.domain.poolmark.dto;

import com.done.swim.domain.poolmark.entity.PoolMark;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PoolMarkResponseDto {
  private Long id;
  private String name;
  private String address;
  private Boolean mark;

  public static PoolMarkResponseDto from(PoolMark poolMark) {
    return PoolMarkResponseDto.builder()
      .id(poolMark.getId())
      .name(poolMark.getPool().getName())
      .address(poolMark.getPool().getAddress())
      .mark(true)
      .build();
  }
}
