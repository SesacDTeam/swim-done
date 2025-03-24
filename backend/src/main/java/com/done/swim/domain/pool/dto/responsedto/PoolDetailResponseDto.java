package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.dto.responsedto.SwimmingTimeResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PoolDetailResponseDto {

  private final String name;
  private final String address;
  private final double latitude;
  private final double longitude;
  private final String additionalInfo;
  private final String parking;
  private final String link;
  private final List<SwimmingTimeResponseDto> swimmingTimes;
  private final List<PoolDetailReviewResponseDto> reviews;

  public static PoolDetailResponseDto from(Pool pool) {
    return PoolDetailResponseDto.builder()
      .name(pool.getName())
      .address(pool.getAddress())
      .latitude(pool.getLatitude())
      .longitude(pool.getLongitude())
      .additionalInfo(pool.getAdditionalInfo())
      .parking(pool.getParking())
      .link(pool.getLink())
      .swimmingTimes(
        pool.getSwimmingTimes().stream()
          .map(SwimmingTimeResponseDto::from)
          .toList()
      )
      .reviews(
        pool.getPoolReviews().stream()
          .map(PoolDetailReviewResponseDto::from)
          .toList()
      )
      .build();
  }

}

