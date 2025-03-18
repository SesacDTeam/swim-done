import React, { useEffect, useState } from 'react';
import { naverLogin } from '../store/slices/authSlice';

export default function NaverRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // 현재 url에서 토큰 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // TODO : 로그인 완료 시 어디로? (이전 페이지 / 메인 페이지 경우의 수)
    try {
      dispatch(naverLogin(token));
      navigate('/mypage');
    } catch (error) {
      navigate('/');
    }
  }, [navigate, dispatch]);

  return <div>로그인 중입니다.</div>;
}
