package com.done.swim.sociallogin.provider;

import java.util.Map;

// 카카오 OAuth2 로그인을 통해 받은 사용자 정보
//  OAuth2UserInfo 인터페이스 -> 카카오 로그인 시 필요한 사용자 정보 추출
public class KakaoUserInfo implements OAuth2UserInfo {

    // response 키 안에 사용자 정보 있음 (카카오)
    private final Map<String, Object> attributes;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

//    private Map<String, Object> attributes;
//    private Map<String, Object> response;
//
//    public NaverUserInfo(Map<String, Object> attributes) {
//        this.attributes = attributes;
//        this.response = (Map<String, Object>) attributes.get("response");
//    }

    @Override
    public String getProvider() {
        return "KAKAO";
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
