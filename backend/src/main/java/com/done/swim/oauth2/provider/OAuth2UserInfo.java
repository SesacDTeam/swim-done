package com.done.swim.oauth2.provider;

// OAuth 공통 메서드 정의하는 인터페이스
public interface OAuth2UserInfo {

    Provider getProvider();

    String getProviderId();

    String getEmail();

    String getNickname();

    String getUserImageUrl();

}
