import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

export default function AuthenticateRoute({ children, cancleAction }) {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const name = useSelector((state) => state.kakaoMap.name);
  const pools = useSelector((state) => state.kakaoMap.pools);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCancleButtonClick = () => {
    navigate(-1);
    cancleAction();
  };

  const handleOkButtonClick = () => {
    const currentPath = window.location.pathname;
    sessionStorage.setItem('beforePath', currentPath);

    if (location.state?.poolName !== null) {
      sessionStorage.setItem('poolName', location.state?.poolName);
    }

    if (name !== null) {
      sessionStorage.setItem('sectionName', name);
    }

    if (pools !== null) {
      sessionStorage.setItem('sectionPools', JSON.stringify(pools));
    }

    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray03/60 flex justify-center items-center z-10000">
        <div className="bg-white w-100 h-50 rounded-2xl flex flex-col items-center justify-between pt-6 overflow-hidden">
          <div className="mt-10 text-center pretendard-medium">
            <div>로그인이 필요한 서비스입니다.</div>
            <div>로그인하시겠습니까?</div>
          </div>
          <div className="flex w-full h-12">
            <button className="flex-1 bg-gray03 text-white w-full" onClick={handleCancleButtonClick}>
              취소
            </button>
            <button className="flex-1 bg-blue01 text-white" onClick={handleOkButtonClick}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
