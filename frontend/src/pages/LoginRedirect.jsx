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

      if (!accessToken) {
        setError(true);
        navigate('/');
        return;
      }
      dispatch(login(accessToken));
      const path = localStorage.getItem('beforePath');
      const name = localStorage.getItem('sectionName');
      const mapPools = localStorage.getItem('sectionPools');
      const poolName = localStorage.getItem('poolName');
      if (name !== null) {
        dispatch(setName({ name }));
      }

      if (mapPools !== null) {
        const pools = JSON.parse(mapPools);
        dispatch(setPools({ pools }));
      }

      navigate(path || '/', { replace: true, state: { poolName } }).then(() => {
        localStorage.removeItem('beforePath');
        localStorage.removeItem('sectionName');
        localStorage.removeItem('sectionPools');
        localStorage.removeItem('poolName');
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
