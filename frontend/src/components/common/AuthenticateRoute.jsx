import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import AlertModal from './AlertModal';

export default function AuthenticateRoute({ children, cancleAction }) {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const name = useSelector((state) => state.kakaoMap.name);
  const pools = useSelector((state) => state.kakaoMap.pools);

  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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

  // 로그인 상태가 변경될 때만 모달을 띄우도록 useEffect 사용
  useEffect(() => {
    if (!isLoggedIn) {
      setModalMessage(['로그인이 필요한 서비스입니다.', '로그인하시겠습니까?']);
      setIsModalOpen(true);
    }
  }, [isLoggedIn]); // isLoggedIn이 변경될 때만 실행

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <AlertModal
          isSingleButton={false} // 두 개의 버튼(취소, 확인) 필요
          message={modalMessage}
          onCancel={handleCancleButtonClick} // 취소 시 실행
          onConfirm={handleOkButtonClick} // 확인 시 실행
        />
      )}
      {isLoggedIn ? <>{children}</> : null}
    </>
  );
}
