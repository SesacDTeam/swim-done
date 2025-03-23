import React, { useEffect, useState } from 'react';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'

export default function NaverRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
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
      navigate('/mypage');
    } catch (error) {
      console.log("error 발생", error)
      setError(true)
      navigate('/'); // 토큰 없으면 home으로 이동
    } finally {
      setIsLoading(false);
    }
  }, [navigate, dispatch]);

  return <div>로그인 중입니다.</div>;
}
