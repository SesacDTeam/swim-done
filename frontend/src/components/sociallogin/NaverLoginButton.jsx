import React from 'react';

export default function NaverLoginButton() {
  // 백엔드에서 제공하는 OAuth2 로그인 URL로 이동 (백엔드를 통해 인증하는 방법)
  // 개발 환경에서는 백엔드 주소 기입
  // oAuth2 로그인 경로는 spring security 기본 경로 따라야 됨. api 안 붙이는 걸 권장함!
  const NAVER_AUTH_URL = `oauth2/authorization/naver`;

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleNaverLogin}
        className="min-w-[180px] font-pretendard font-semibold flex items-center bg-ngreen text-white rounded-md px-40 py-4 gap-3 mb-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
          <path
            d="M9.24387 7.44339L4.57223 0.700293H0.700195V13.3003H4.75652V6.55614L9.42816 13.3003H13.3002V0.700293H9.24387V7.44339Z"
            fill="white"
          />
        </svg>
        <span className="leading-normal">네이버로 계속하기</span>
      </button>
    </div>
  );
}
