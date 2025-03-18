package com.done.swim.sociallogin;

import com.done.swim.domain.user.entity.User;
import com.done.swim.domain.user.repository.UserRepository;
import com.done.swim.sociallogin.provider.NaverUserInfo;
import com.done.swim.sociallogin.provider.Provider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    // CustomOAuth2UserService : OAuth2 사용자 정보 처리 (사용자 인증 로직)

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();

        // 네이버 사용자 정보 DTO 변환
        NaverUserInfo naverUserInfo = new NaverUserInfo(attributes);

        Provider provider = naverUserInfo.getProvider();

        // TODO : 기존 회원 확인 및 없으면 회원가입 (근데 애초에 소셜로그인만 있으면 이게 무슨 상관일까? -> 그냥 바로 userepository에 저장?)
        User user = userRepository.findByEmail(naverUserInfo.getEmail())
                .orElseGet(() -> {
                    User naverUser = User.builder()
                            .email(naverUserInfo.getEmail())
                            .nickname(naverUserInfo.getNickname())
                            .imageUrl(naverUserInfo.getUserImageUrl())
                            .provider(provider.name()) // Provider enum 값 사용
                            .providerId(naverUserInfo.getProviderId())
                            .build();

                    return userRepository.save(naverUser);
                });

        return new CustomOAuth2User(user, attributes);
    }
}
