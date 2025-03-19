package com.done.swim.sociallogin;

import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import java.util.Collections;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    // CustomOAuth2UserService : OAuth2 사용자 정보 처리 (사용자 인증 로직)

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // 어떤 OAuth2 제공자인지 확인 (네이버 or 카카오)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email;
        String nickname;
        String provider;
        String providerId;
        String profileImage = ""; // 기본적으로 프로필 이미지는 null (네이버만 제공)

        if ("naver".equals(registrationId)) {
            //  네이버의 경우 "response" 내부 데이터 추출
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");

            email = (String) response.get("email");
            nickname = (String) response.get("nickname");
            providerId = (String) response.get("id");
            provider = "NAVER";
            profileImage =
                response.get("profile_image") != null ? response.get("profile_image").toString()
                    : ""; // 네이버는 프로필 이미지 제공


        } else if ("kakao".equals(registrationId)) {
            //  카카오는 "id" + "kakao_account" 내부 데이터 추출
            providerId = attributes.get("id").toString();
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get(
                "kakao_account");
            Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

            email = kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : null;
            nickname = properties.get("nickname").toString();
            provider = "KAKAO";
            profileImage =
                properties.get("profile_image_url") != null ? properties.get("profile_image_url")
                    .toString()
                    : "";

        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다.");
        }

        //  공통 로직: 기존 회원 확인 후 저장 (중복 제거)
        String finalProfileImage = profileImage;
        User user = userRepository.findByEmail(email)
            .orElseGet(() -> userRepository.save(User.builder()
                .email(email)
                .nickname(nickname)
                .imageUrl(finalProfileImage)  // 네이버는 값이 있고, 카카오는 null 가능
                .provider(provider)
                .providerId(providerId)
                .build()));

        return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
            attributes,
            "id"  // OAuth2User의 getName()이 email을 반환하도록 설정
        );
//        return new CustomOAuth2User(user, attributes);
////    }
    }
}
