package com.done.swim.sociallogin;

import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.sociallogin.provider.KakaoUserInfo;
import com.done.swim.sociallogin.provider.NaverUserInfo;
import com.done.swim.sociallogin.provider.Provider;
import com.done.swim.sociallogin.provider.OAuth2UserInfo;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    // CustomOAuth2UserService : OAuth2 사용자 정보 처리 (사용자 인증 로직)

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // 액세스 토큰 확인 로그 추가
//        String accessToken = userRequest.getAccessToken().getTokenValue();
//        System.out.println("카카오 액세스 토큰: " + accessToken);

        // 어떤 OAuth2 제공자인지 확인 (네이버 or 카카오)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo oAuth2UserInfo;

        if ("naver".equals(registrationId)) {
            oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
        } else if ("kakao".equals(registrationId)) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다.");
        }

        User user = userRepository.findByEmail(oAuth2UserInfo.getEmail())
            .orElseGet(() -> userRepository.save(User.builder()
                .email(oAuth2UserInfo.getEmail())
                .nickname(oAuth2UserInfo.getNickname())
                .imageUrl(oAuth2UserInfo.getUserImageUrl())
                .provider(oAuth2UserInfo.getProvider().name())
                .providerId(oAuth2UserInfo.getProviderId())
                .build()));

        // 이메일을 로그로 출력하여 확인
        log.info("OAuth2User에서 추출한 이메일: {}", oAuth2UserInfo.getEmail());

        return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
            oAuth2User.getAttributes(),
            "id"
        );
    }
}
