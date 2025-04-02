import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecentLoginLabel from '../components/sociallogin/RecentLoginLabel';
import SocialLoginButton from '../components/sociallogin/SocialLoginButton';

export default function Login() {
  // 리덕스에서 로그인 이력 가져오기
  const loginHistory = useSelector((state) => state.auth.loginHistory);
  // 최근 로그인한 provider 가져오기
  const recentProvider =
    loginHistory.length > 0 ? loginHistory[loginHistory.length - 1].provider : null;

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

      {/* 각 버튼 위에 최근 로그인 정보 표시 */}
      <div className="flex flex-col mt-15 space-y-3 font-semibold items-center">
        {/* 카카오 로그인 */}
        <div className="relative w-fit flex">
          {recentProvider === 'KAKAO' && <RecentLoginLabel />}
          <SocialLoginButton
            provider="kakao"
            bgColor="bg-kyello"
            textColor="text-black"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C6.48 2 2 5.83 2 10.4C2 13.59 4.2 16.34 7.49 17.72L6.52 21.76C6.47 21.97 6.66 22.15 6.85 22.05L12.29 18.86C12.52 18.9 12.76 18.91 13 18.91C18.52 18.91 23 15.08 23 10.5C23 5.92 18.52 2 12 2Z"
                  fill="black"
                ></path>
              </svg>
            }
            text="카카오로 계속하기"
          />
        </div>

        {/* 네이버 로그인 */}
        <div className="relative w-fit flex">
          {recentProvider === 'NAVER' && <RecentLoginLabel />}
          <SocialLoginButton
            provider="naver"
            bgColor="bg-ngreen"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
                <path
                  d="M9.24387 7.44339L4.57223 0.700293H0.700195V13.3003H4.75652V6.55614L9.42816 13.3003H13.3002V0.700293H9.24387V7.44339Z"
                  fill="white"
                ></path>
              </svg>
            }
            text="네이버로 계속하기"
          />
        </div>

        {/* 깃허브 로그인 */}
        <div className="relative w-fit flex">
          {recentProvider === 'GITHUB' && <RecentLoginLabel />}
          <SocialLoginButton
            provider="github"
            bgColor="bg-title"
            textColor="text-white"
            icon={
              <svg
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                ></path>
              </svg>
            }
            text="깃허브로 계속하기"
          />
        </div>
      </div>

      <Link to="/">
        <div className="text-center text-gray04 mt-10">🏠 홈으로 가기</div>
      </Link>
    </>
  );
}
