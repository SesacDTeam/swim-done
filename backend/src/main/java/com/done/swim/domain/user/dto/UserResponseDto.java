package com.done.swim.domain.user.dto;

import com.done.swim.domain.user.entity.User;
import lombok.Getter;

@Getter
public class UserResponseDto {

    private String email;
    private String nickname;

    public UserResponseDto(User user) {
        this.email = user.getEmail();
        this.nickname = user.getNickname();
    }
}
