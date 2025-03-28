import React from 'react';
import KakaoLoginButton from '../components/sociallogin/KakaoLoginButton';
import NaverLoginButton from '../components/sociallogin/NaverLoginButton';
import GithubLoginButton from '../components/sociallogin/GithubLoginButton';
import { Link } from 'react-router-dom';
import { logoMan } from '../utils/staticImagePath';


export default function Login() {
  return (
    <>
        {/* <img src={logoMan} alt="로고 이미지" className="ml-30 mt-5 w-20" /> */}
        <div className="font-pretendard font-bold text-center text-5xl mt-30 mb-10 text-title">
        <h1 className="mb-5">
          <span className="text-blue01">자유 수영</span> 정보를 한눈에 확인하고
        </h1>
        <h1>
          <span className="text-blue01">내가 원하는 시간</span>에 수영을 즐겨보세요!
        </h1>
      </div>
        <div className='font-pretendard font-semibold text-center text-xl text-title/80'>
          <p>🏊‍♂️ 자유 수영의 모든 것, 오수완에 오신 걸 환영해요 🏊‍♂️</p>
        </div>
      <div className="flex flex-col mt-15 space-y-3">
        <NaverLoginButton></NaverLoginButton>
        <KakaoLoginButton></KakaoLoginButton>
        <GithubLoginButton></GithubLoginButton>
      </div>
      <Link to="/">
        <div className="font-pretendard text-center text-gray04 mt-20">🏠 홈으로 가기</div>
      </Link>
    </>
  );
}
