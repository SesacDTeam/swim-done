import React, { useEffect, useState } from 'react';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setName, setPools } from '../store/slices/kakaoMapSlice';

export default function LoginRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    try {
      // 현재 url에서 토큰 가져오기

      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('token');
      const kakaoAccessToken = urlParams.get('kakaoAccessToken'); // 카카오 액세스 토큰 (예시로 'kakao_token'이라고 가정)

      console.log('현재 URL:', window.location.href);
      console.log('추출된 토큰:', accessToken);
      console.log('추출된 카카오 토큰:', kakaoAccessToken);

      if (!accessToken) {
        console.log('🚨 토큰이 없어서 홈으로 이동');
        setError(true);
        navigate('/');
        return;
      }

      if (kakaoAccessToken) {
        // 카카오 액세스 토큰도 저장
        localStorage.setItem('kakaoAccessToken', kakaoAccessToken); // 로컬 스토리지에 카카오 액세스 토큰 저장
        console.log('카카오 액세스 토큰 저장됨:', kakaoAccessToken);
      }

      // JWT 토큰을 Redux에 저장
      dispatch(login(accessToken));

      const path = sessionStorage.getItem('beforePath');
      const name = sessionStorage.getItem('sectionName');
      const mapPools = sessionStorage.getItem('sectionPools');
      const poolName = sessionStorage.getItem('poolName');

      if (name !== null) {
        dispatch(setName({ name }));
      }

      if (mapPools !== null) {
        const pools = JSON.parse(mapPools);
        dispatch(setPools({ pools }));
      }

      navigate(path || '/', { replace: true, state: { poolName } }).then(() => {
        sessionStorage.removeItem('beforePath');
        sessionStorage.removeItem('sectionName');
        sessionStorage.removeItem('sectionPools');
        sessionStorage.removeItem('poolName');
      });
    } catch (error) {
      setError(true);
      navigate('/'); // 토큰 없으면 home으로 이동
    } finally {
      setIsLoading(false);
    }
  }, [navigate, dispatch]);

  return <div>로그인 중입니다.</div>;
}
