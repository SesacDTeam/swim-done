package com.done.swim.oauth2.provider;


public enum Provider {
    NAVER, KAKAO, GITHUB;

    public String toLowerCase() {
        return name().toLowerCase();
    }
}
