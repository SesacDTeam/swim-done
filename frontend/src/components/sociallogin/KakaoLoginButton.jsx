import React from 'react';
export default function KakaoLoginButton() {
  const handleKakaoLogin = async () => {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    // 카카오 로그인 페이지로 리디렉션
    window.location.href = `${DOMAIN}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex justify-center mt-2">
      <button
        onClick={handleKakaoLogin}
        className="font-pretendard font-semibold flex items-center bg-[#FEE500] text-black rounded-md px-4 py-2 gap-3 mb-2"
      >
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
          />
        </svg>
        카카오톡 로그인
      </button>
    </div>
  );
}
