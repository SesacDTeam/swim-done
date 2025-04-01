package com.done.swim.oauth2.provider;

import lombok.Setter;
import java.util.Map;

public class GithubUserInfo implements OAuth2UserInfo {

    private Map<String, Object> attributes;

    @Setter
    private String email;

    public GithubUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.email = (String) attributes.get("email"); // GitHub에서 제공하는 이메일 값 (없을 수도 있음)
    }

    @Override
    public Provider getProvider() {
        return Provider.GITHUB;
    }

    // github는 id가 Integer라 string으로 변환해야 함
    // 근데 (String) attributes.get("id)는 Integer -> String 변환 시 ClassCastException 발생 가능함
    // 에러 내용 : Integer cannot be cast to class java.lang.String
    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getEmail() {
        return email;
    }

    // 깃허브에서 login이란 이름으로 이름 제공함
    @Override
    public String getNickname() {
        return (String) attributes.get("login");
    }

    @Override
    public String getUserImageUrl() {
        return "";
    }

}
