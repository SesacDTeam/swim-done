import React, { useEffect, useState } from 'react';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function LoginRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.location.search.includes('token=')) return;

    console.log('🔹 LoginRedirect 실행됨!');

    setIsLoading(true);
    try {
      // 현재 url에서 토큰 가져오기

      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('token');

      console.log('🔹 현재 URL:', window.location.href);
      console.log('🔹 추출된 토큰:', accessToken);

      if (!accessToken) {
        console.log('🚨 토큰이 없어서 홈으로 이동');
        setError(true);
        navigate('/');
        return;
      }
      dispatch(login(accessToken));
      console.log('🔹 dispatch 실행됨! 액세스 토큰:', accessToken);

      console.log('✅ 로그인 성공! 마이페이지로 이동');
      navigate('/mypage');
      console.log('✅ navigate 실행됨!');
    } catch (error) {
      console.error('🚨 로그인 리디렉트 오류:', error);
      setError(true);
      navigate('/'); // 토큰 없으면 home으로 이동
    } finally {
      setIsLoading(false);
    }
  }, [navigate, dispatch]);

  return <div>로그인 중입니다.</div>;
}
