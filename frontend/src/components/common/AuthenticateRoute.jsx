import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

export default function AuthenticateRoute({ children, cancleAction }) {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const name = useSelector((state) => state.kakaoMap.name);
  const pools = useSelector((state) => state.kakaoMap.pools)

  const navigate = useNavigate();
  const location = useLocation();

  const handleCancleButtonClick = () => {
    navigate(-1);
    cancleAction();
  };

  const handleOkButtonClick = () => {
    const currentPath = window.location.pathname;
    localStorage.setItem('beforePath', currentPath);

    if (location.state.poolName !== null) {
      localStorage.setItem('poolName', location.state.poolName);
    }

    if (name !== null) {
      localStorage.setItem('sectionName', name);
    }

    if (pools !== null) {
      localStorage.setItem('sectionPools', JSON.stringify(pools));
    }

    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray03/60 flex justify-center items-center z-10000">
        <div className="bg-white w-150 h-100 rounded-2xl flex flex-col items-center justify-center">
          <div>로그인이 필요한 서비스입니다.</div>
          <div>로그인하시겠습니까?</div>
          <div className="flex gap-20">
            <button onClick={handleCancleButtonClick}>취소</button>
            <button onClick={handleOkButtonClick}>확인</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
