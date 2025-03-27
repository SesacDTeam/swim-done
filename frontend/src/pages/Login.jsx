import React from 'react';
import KakaoLoginButton from '../components/sociallogin/KakaoLoginButton';
import NaverLoginButton from '../components/sociallogin/NaverLoginButton';
import GithubLoginButton from '../components/sociallogin/GithubLoginButton';

export default function Login() {
  return (
    <>
      <div className='font-pretendard font-bold text-center text-2xl mt-30 mb-10'>
        <h1>
          흩어져있던 <span className='text-blue01'>자유 수영 정보</span>를 한눈에!
        </h1>
        <h1>오수완에 오신 걸 환영해요.</h1>
      </div>
      <NaverLoginButton></NaverLoginButton>
      <KakaoLoginButton></KakaoLoginButton>
      <GithubLoginButton></GithubLoginButton>
    </>
  );
}
