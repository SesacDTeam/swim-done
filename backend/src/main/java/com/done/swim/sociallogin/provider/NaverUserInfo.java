package com.done.swim.sociallogin.provider;

import java.util.Map;

// 네이버 OAuth2 로그인을 통해 받은 사용자 정보
//  OAuth2UserInfo 인터페이스 -> 네이버 로그인 시 필요한 사용자 정보 추출
public class NaverUserInfo implements OAuth2UserInfo {

    private Map<String, Object> attributes;

    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    // enum으로 변경함
    @Override
    public Provider getProvider() {
        return Provider.NAVER;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getUserImageUrl() {
        return (String) attributes.get("profile_image");
    }
}
