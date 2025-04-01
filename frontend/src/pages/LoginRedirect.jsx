import React, { useEffect, useState } from 'react';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setSection, setPools } from '../store/slices/kakaoMapSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function LoginRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    try {
      // 현재 url에서 토큰 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('token');
      const provider = urlParams.get('provider');

      if (!accessToken) {
        setError(true);
        navigate('/');
        return;
      }

      // JWT 토큰을 Redux에 저장
      // provider도 같이 저장(로그인 이력 확인용)
      dispatch(login({ accessToken, provider }));

      const path = sessionStorage.getItem('beforePath');
      const name = sessionStorage.getItem('sectionName');
      const mapPools = sessionStorage.getItem('sectionPools');
      const poolName = sessionStorage.getItem('poolName');

      if (name !== null) {
        dispatch(setSection({ name }));
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
      setIsLoading(false);

      navigate('/'); // 토큰 없으면 home으로 이동
    }
  }, [navigate, dispatch]);

  return <>{isLoading && <LoadingSpinner />}</>;
}
