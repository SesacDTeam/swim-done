package com.done.swim.sociallogin.provider;

// OAuth 공통 메서드 정의하는 인터페이스
public interface OAuth2UserInfo {

    Enum getProvider();

    String getProviderId();

    String getEmail();

    String getNickname();

    String getUserImageUrl();

}
