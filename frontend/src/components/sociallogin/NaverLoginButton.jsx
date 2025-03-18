import React from 'react';

export default function NaverLoginButton() {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URL = import.meta.env.VITE_NAVER_REDIRECT_URL;

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&state=1234`;

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleNaverLogin}
        style={{ backgroundColor: '#03C75A' }}
        className="flex items-center text-white rounded-md px-4 py-2 gap-2 display-center mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9.24387 7.44339L4.57223 0.700293H0.700195V13.3003H4.75652V6.55614L9.42816 13.3003H13.3002V0.700293H9.24387V7.44339Z"
            fill="white"
          />
        </svg>
        네이버로 계속하기
      </button>
    </div>
  );
}
