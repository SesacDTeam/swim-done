package com.done.swim.domain.user.entity;

import com.done.swim.common.BaseTimeEntity;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.submittedimage.entity.SubmittedImage;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String nickname;

    // OAuth2
    private String provider;
    private String providerId;

    private String imageUrl;

//    @Enumerated(EnumType.STRING)
//    private Role role;

    // 리뷰 등이 있을 때 회원탈퇴가 안되는 현상 해결 코드
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<PoolReview> poolReviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<PoolMark> poolMarks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<SubmittedImage> images;

    @Builder
    public User(String email, String nickname, String provider, String providerId,
                String imageUrl) {
        this.email = email;
        this.nickname = nickname;
        this.provider = provider;
        this.providerId = providerId;
        this.imageUrl = imageUrl;
    }

    // provider 업데이트 메서드
    public void updateProvider(String provider, String providerId) {
        this.provider = provider;
        this.providerId = providerId;
    }

    // UserDetails 인터페이스 구현
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return null;  // OAuth 로그인에서는 비밀번호 사용 안 함
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}