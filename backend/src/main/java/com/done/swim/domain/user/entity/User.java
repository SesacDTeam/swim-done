package com.done.swim.domain.user.entity;

import com.done.swim.common.BaseTimeEntity;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.submittedimage.entity.SubmittedImage;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


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

    private String kakaoAccessToken;

//    @Enumerated(EnumType.STRING)
//    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<PoolReview> poolReviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<PoolMark> poolMarks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<SubmittedImage> images;
    
    @Builder
    public User(String email, String nickname, String provider, String providerId,
        String imageUrl, String kakaoAccessToken) {
        this.email = email;
        this.nickname = nickname;
        this.provider = provider;
        this.providerId = providerId;
        this.imageUrl = imageUrl;
        this.kakaoAccessToken = kakaoAccessToken;
    }

    public void setKakaoAccessToken(String kakaoAccessToken) {
        this.kakaoAccessToken = kakaoAccessToken;
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