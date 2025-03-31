import React from 'react';
import KakaoLoginButton from '../components/sociallogin/KakaoLoginButton';
import NaverLoginButton from '../components/sociallogin/NaverLoginButton';
import GithubLoginButton from '../components/sociallogin/GithubLoginButton';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <div className="font-bold text-center text-5xl mt-30 mb-10 text-title">
        <h1 className="mb-5">
          <span className="text-blue01">자유 수영</span>의 모든 것
        </h1>
        <h1>
          <span className="text-blue01">오수완</span>에 오신 걸 환영해요!
        </h1>
      </div>
      <div className="font-semibold text-center text-xl text-title/80">
        <p>자유 수영 정보를 한눈에 확인하고 내가 원하는 시간에 수영을 즐겨보세요 🏊‍♂️</p>
      </div>
      <div className="flex flex-col mt-15 space-y-3">
        <KakaoLoginButton></KakaoLoginButton>
        <NaverLoginButton></NaverLoginButton>
        <GithubLoginButton></GithubLoginButton>
      </div>
      <Link to="/">
        <div className="text-center text-gray04 mt-20">🏠 홈으로 가기</div>
      </Link>
    </>
  );
}
