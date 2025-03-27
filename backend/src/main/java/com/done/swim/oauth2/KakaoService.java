package com.done.swim.oauth2;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class KakaoService {

    private final RestTemplate restTemplate; // RestTemplate을 통한 API 호출

    public void disconnectKakaoAccount(String accessToken) {
        String url = "https://kapi.kakao.com/v1/user/unlink"; // 카카오 계정 연결 끊기 API URL

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken); // 카카오 액세스 토큰을 헤더에 포함

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity,
                String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                // 카카오 계정 연결이 성공적으로 끊어진 경우
                System.out.println("카카오 계정 연결이 끊어졌습니다.");
            }
        } catch (HttpClientErrorException e) {
            // 예외 처리: 예를 들어 액세스 토큰 만료 시 처리
            System.err.println("카카오 계정 연결 끊기 실패: " + e.getMessage());
        }
    }
}
