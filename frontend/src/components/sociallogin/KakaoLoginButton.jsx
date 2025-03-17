import React from 'react';

export default function KakaoLoginButton() {
  const handleLogin = () => {
    alert('카카오 로그인 버튼 클릭됨!'); // 버튼 클릭 시 알림창이 떠야 함
    console.log('카카오 로그인 버튼 클릭됐습니다!'); // 버튼 클릭 이벤트 확인용
    console.log('Redirect URL:', 'http://localhost:8080/oauth2/authorization/kakao'); // URL 확인
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
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
