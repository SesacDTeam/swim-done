import React from 'react';
import KakaoLoginButton from '../components/sociallogin/KakaoLoginButton';
import NaverLoginButton from '../components/sociallogin/NaverLoginButton';
import GithubLoginButton from '../components/sociallogin/GithubLoginButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';

export default function Login() {
  // 리덕스에서 로그인 이력 가져오기
  const loginHistory = useSelector((state) => state.auth.loginHistory);
  // 최근 로그인한 provider 가져오기
  const recentProvider =
    loginHistory.length > 0 ? loginHistory[loginHistory.length - 1].provider : null;

  return (
    <>
      <div className="font-pretendard font-bold text-center text-5xl mt-30 mb-10 text-title">
        <h1 className="mb-5">
          <span className="text-blue01">자유 수영</span>의 모든 것
        </h1>
        <h1>
          <span className="text-blue01">오수완</span>에 오신 걸 환영해요!
        </h1>
      </div>
      <div className="font-pretendard font-semibold text-center text-xl text-title/80">
        <p>자유 수영 정보를 한눈에 확인하고 내가 원하는 시간에 수영을 즐겨보세요 🏊‍♂️</p>
      </div>

      {/* 각 버튼 위에 최근 로그인 정보 표시 */}
      <div className="flex flex-col mt-15 space-y-3 font-semibold items-center">
        {/* 카카오 로그인 */}
        <div className="relative w-fit flex">
          {recentProvider === 'KAKAO' && (
            <div className="absolute top-[-20px] left-30 bg-white text-title border border-gray02 text-xs px-3 py-1 rounded-md shadow-md">
              최근 로그인
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-4 h-3 bg-white border-l border-r border-gray02"
                style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
              ></div>
            </div>
          )}
          <KakaoLoginButton />
        </div>

        {/* 네이버 로그인 */}
        <div className="relative w-fit flex">
          {recentProvider === 'NAVER' && (
            <div className="absolute top-[-20px] left-30 bg-white text-title border border-gray02 text-xs px-3 py-1 rounded-md shadow-md">
              최근 로그인
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-4 h-3 bg-white border-l border-r border-gray02"
                style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
              ></div>
            </div>
          )}
          <NaverLoginButton />
        </div>

        {/* 깃허브 로그인 */}
        <div className="relative">
          <GithubLoginButton />
          {recentProvider === 'GITHUB' && (
            <div className="absolute top-[-20px] left-30 bg-white text-title border border-gray02 text-xs px-3 py-1 rounded-md shadow-md">
              최근 로그인
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-4 h-3 bg-white border-l border-r border-gray02"
                style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
              ></div>
            </div>
          )}
        </div>
      </div>

      <Link to="/">
        <div className="font-pretendard text-center text-gray04 mt-10">🏠 홈으로 가기</div>
      </Link>
    </>
  );
}
