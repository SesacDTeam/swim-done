package com.done.swim.domain.user.entity;

import com.done.swim.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity/* implements UserDetails*/ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String nickname;

    // OAuth2
    private String provider;
    private String providerId;

//    @Enumerated(EnumType.STRING)
//    private Role role;

    @Builder
    public User(String email, String nickname, String provider, String providerId) {
        this.email = email;
        this.nickname = nickname;
        this.provider = provider;
        this.providerId = providerId;
    }
}