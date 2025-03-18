package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolreview.dto.responsedto.PoolDetailPageReviewResponseDto;
import com.done.swim.domain.swimmingtime.dto.responsedto.FreeSwimmingTimeResponseDto;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PoolDetailResponseDto {

  private final String name;
  private final String address;
  private final double latitude;
  private final double longitude;
  private final String additionalInfo;
  private final String parking;
  private final List<FreeSwimmingTimeResponseDto> swimmingTimes;
  private final List<PoolDetailPageReviewResponseDto> reviews;

  public static PoolDetailResponseDto from(Pool pool) {
    return PoolDetailResponseDto.builder()
        .name(pool.getName())
        .address(pool.getAddress())
        .latitude(pool.getLatitude())
        .longitude(pool.getLongitude())
        .additionalInfo(pool.getAdditionalInfo())
        .parking(pool.getParking())
        .swimmingTimes(
            pool.getSwimmingTimes().stream()
                .map(FreeSwimmingTimeResponseDto::from)
                .toList()
        )
        .reviews(
            pool.getPoolReviews().stream()
                .map(PoolDetailPageReviewResponseDto::from)
                .toList()
        )
        .build();
  }

}

