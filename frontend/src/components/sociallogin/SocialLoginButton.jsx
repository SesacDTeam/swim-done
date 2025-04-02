import React from 'react'

export default function SocialLoginButton({ provider, bgColor, textColor, icon, text}) {
  // 백엔드에서 제공하는 OAuth2 로그인 URL로 이동 (백엔드를 통해 인증하는 방법)
  // 개발 환경에서는 백엔드 주소 기입
  // oAuth2 로그인 경로는 spring security 기본 경로 따라야 됨. api 안 붙이는 걸 권장함!
  const authUrl = `oauth2/authorization/${provider}`

  const handleLogin = async () => {
    window.location.href = authUrl;
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleLogin}
        className={`min-w-[180px] font-semibold flex items-center ${bgColor} ${textColor} rounded-md px-40 py-4 gap-3 mb-2`}
      >
        {icon}
        <span className="leading-normal">{text}</span>
      </button>
    </div>
  );
}
