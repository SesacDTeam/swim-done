package com.done.swim.oauth2.provider;

import java.util.Map;

// 네이버 OAuth2 로그인을 통해 받은 사용자 정보
//  OAuth2UserInfo 인터페이스 -> 네이버 로그인 시 필요한 사용자 정보 추출
public class NaverUserInfo implements OAuth2UserInfo {

    // response 키 안에 사용자 정보 있음 (네이버)
    private final Map<String, Object> response;

    public NaverUserInfo(Map<String, Object> attributes) {
        this.response = (Map<String, Object>) attributes.get("response");
    }

    // enum으로 변경함
    @Override
    public Provider getProvider() {
        return Provider.NAVER;
    }

    @Override
    public String getProviderId() {
        return (String) response.get("id");
    }

    @Override
    public String getEmail() {
        return (String) response.get("email");
    }

    @Override
    public String getNickname() {
        return (String) response.get("nickname");
    }

    @Override
    public String getUserImageUrl() {
        return (String) response.get("profile_image");
    }
}
