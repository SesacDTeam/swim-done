package com.done.swim.domain.user.dto.responsedto;

import com.done.swim.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetUserInfoResponseDto {

  private String nickname;
  private String email;

  public static GetUserInfoResponseDto from(User entity) {
    return GetUserInfoResponseDto.builder()
        .nickname(entity.getNickname())
        .email(entity.getEmail())
        .build();
  }
}
