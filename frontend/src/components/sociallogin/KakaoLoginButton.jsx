import React from 'react';

export default function KakaoLoginButton() {
  const handleLogin = () => {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    window.location.href = `${DOMAIN}/oauth2/authorization/kakao`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-yellow-400 text-black px-5 py-2 text-lg rounded-md hover:bg-yellow-500 active:bg-yellow-600 transition"
    >
      카카오톡 로그인 하기
    </button>
  );
}
