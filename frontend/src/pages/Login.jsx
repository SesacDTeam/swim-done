import React from 'react';
import KakaoLoginButton from '../components/sociallogin/KakaoLoginButton';

export default function Login() {
  return (
    <>
      <div>
        <h1>
          흩어져있던 <span style={{ color: '#0085ff' }}>자유 수영 정보</span>를 한눈에!
        </h1>
        <h1>오수완에 오신 걸 환영해요.</h1>
      </div>
      <KakaoLoginButton></KakaoLoginButton>
    </>
  );
}
