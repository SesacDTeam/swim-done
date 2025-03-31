import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyPageItem from './MyPageItem';
import { Outlet } from 'react-router-dom';
import instance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import userApi from '../../api/userApi';
import useErrorResolver from '../../hooks/useErrorResolver';
import ERROR_DISPLAY_MODE from '../../error/ERROR_DISPLAY_MODE';

import {
  profile,
  myReview,
  contactUs,
  myReviewColor,
  contactUsColor
} from '../../utils/staticImagePath';
import AlertModal from '../common/AlertModal';

export default function MyPage() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.FALLBACK_UI);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});

  const getUserInfo = async () => {
    try {
      const response = await userApi.getUserInfo();
      setUserInfo(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleMyReviewsClick = () => {
    navigate('reviews');
  };

  const handleLogout = () => {
    setModalMessage(['로그아웃 하시겠습니까?']);
    setModalAction(() => logoutAction); // 로그아웃 액션을 모달의 확인 버튼에 연결
    setIsModalOpen(true);
  };

  // 로그아웃 액션
  const logoutAction = async () => {
    try {
      await instance.post('/logout');
      dispatch(logout());
      navigate('/');
    } catch (error) {}
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = () => {
    setModalMessage([
      '정말 회원 탈퇴하시겠습니까?',
      '회원 탈퇴를 원하시면 확인 버튼을 눌러주세요.',
    ]);
    setModalAction(() => withdrawAction); // 회원 탈퇴 액션을 모달의 확인 버튼에 연결
    setIsModalOpen(true);
  };

  // 회원 탈퇴 액션
  const withdrawAction = async () => {
    try {
      await instance.delete('/withdraw');
      dispatch(logout()); // Redux 상태 초기화
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      alert('회원 탈퇴 중 오류가 발생했습니다.'); // TODO: 에러 toast창으로 변경
    }
  };

  return (
    <div className="select-none">
      <h1 className="pretendard-bold text-2xl mt-10 ml-5 sticky text-center">마이페이지</h1>
      <div className="flex justify-between relative top-18 h-26 w-85 mx-auto">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="text-2xl pretendard-bold mb-1">{userInfo?.nickname} 님</div>
            <div className="text-2xl pretendard-bold text-blue01">오늘도 즐수하세요!</div>
          </div>
          <div>{userInfo?.email}</div>
        </div>
        <div className="w-20 h-18">
          <img src={profile} alt="" className="h-full w-full" />
          <button className="w-full text-center cursor-pointer outline-none" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
      <div className="relative top-40 h-55 w-85 mx-auto flex flex-col justify-between">
        <MyPageItem
          image={myReview}
          hoverImage={myReviewColor}
          text="내가 남긴 리뷰"
          onClick={handleMyReviewsClick}
        />
        <MyPageItem
          image={contactUs}
          hoverImage={contactUsColor}
          text="문의하기"
          onClick={() =>
            window.open(
              'https://docs.google.com/forms/d/11e9EqdCulELLjuw7oIisCIXd_DCb_XJBDnTsSJBnjPE/edit',
              '_blank',
            )
          }
        />
      </div>
      <div className="flex justify-center">
        <button
          className="relative top-69 h-10 cursor-pointer outline-none"
          onClick={handleWithdraw}
        >
          회원 탈퇴
        </button>
      </div>

      {!isDetailViewHidden && (
        <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white overflow-y-auto">
          <Outlet />
        </div>
      )}

      {isModalOpen && (
        <AlertModal
          isSingleButton={false} // 두 개의 버튼(취소, 확인) 필요
          message={modalMessage}
          onCancel={() => setIsModalOpen(false)} // 취소 버튼 클릭 시 모달 닫기
          onConfirm={() => {
            modalAction(); // 확인 버튼 클릭 시 연결된 액션 실행
            setIsModalOpen(false); // 모달 닫기
          }}
        />
      )}
    </div>
  );
}
