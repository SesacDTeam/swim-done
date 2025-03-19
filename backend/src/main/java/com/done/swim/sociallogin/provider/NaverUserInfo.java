package com.done.swim.sociallogin.provider;

import java.util.Map;

// 네이버 OAuth2 로그인을 통해 받은 사용자 정보
//  OAuth2UserInfo 인터페이스 -> 네이버 로그인 시 필요한 사용자 정보 추출
public class NaverUserInfo implements OAuth2UserInfo {

    // response 키 안에 사용자 정보 있음 (네이버)
    private final Map<String, Object> attributes;

    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getProvider() {
        return "NAVER";
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        return attributes.get("email").toString();
    }

    @Override
    public String getNickname() {
        return attributes.get("nickname").toString();
    }

    @Override
    public String getUserImageUrl() {
        return attributes.get("profile_image") != null ? attributes.get("profile_image").toString()
            : "";
    }
}
