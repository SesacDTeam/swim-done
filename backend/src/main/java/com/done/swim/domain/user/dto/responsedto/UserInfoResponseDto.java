package com.done.swim.domain.user.dto.responsedto;

import com.done.swim.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponseDto {

    private String nickname;
    private String email;

    public static UserInfoResponseDto from(User entity) {
        return UserInfoResponseDto.builder()
                .nickname(entity.getNickname())
                .email(entity.getEmail())
                .build();
    }
}
