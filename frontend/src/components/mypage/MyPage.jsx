import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyPageItem from './MyPageItem';
import { Outlet } from 'react-router-dom';
import DetailViewHeader from '../common/DetailViewHeader';
import instance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import userApi from '../../api/userApi';

import {
  profile,
  myReview,
  keywordReview,
  contactUs,
  myReviewColor,
  keywordReviewColor,
  contactUsColor,
  xmark,
} from '../../utils/staticImagePath';

export default function MyPage() {
  const dispatch = useDispatch();
  const nickName = useSelector((state) => state.user.nickName);
  const email = useSelector((state) => state.user.email);
  const [userInfo, setUserInfo] = useState(null);
  const [isOutletVisible, setIsOutletVisible] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await userApi.getUserInfo();

      if (response && response.data) {
        setUserInfo(response.data);
      } else {
        throw new Error('응답 데이터가 올바르지 않습니다.');
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleItemClick = () => {
    setIsOutletVisible(true); // Outlet 보이도록 상태 변경
  };

  const handleCloseButtonClick = () => {
    setIsOutletVisible(false); // close 버튼 클릭 시 Outlet을 숨김
  };

  const navigate = useNavigate(); // ✅ useNavigate 훅 사용

  const handleLogout = async () => {
    const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
    if (!isConfirmed) return;
    try {
      await instance.post('/logout');

      dispatch(logout());
      alert('로그아웃이 완료되었습니다.');
      navigate('/');
    } catch (error) {
    }
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = async () => {
    const isConfirmed = window.confirm('정말 회원 탈퇴하시겠습니까?');
    if (!isConfirmed) return;

    try {
      await instance.delete('/withdraw');
      // await instance.post('/logout'); // 회원 탈퇴 후 로그아웃 요청 (안전한 토큰 삭제)
      dispatch(logout()); // Redux 상태 초기화
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  if (!userInfo) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div>로딩 중...</div>
        </div>
      </>
    );
  }

  return (
    <div className="select-none">
      <h1 className="pretendard-bold text-2xl mt-10 ml-5 sticky text-center">마이페이지</h1>
      <div className="flex justify-between relative top-18 h-26 w-85 mx-auto">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="text-2xl pretendard-bold mb-1">{userInfo.nickname} 님</div>
            <div className="text-2xl pretendard-bold text-blue01">오늘도 즐수하세요!</div>
          </div>
          <div>{userInfo.email}</div>
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
          navigateTo="/mypage/reviews"
          onClick={handleItemClick}
        />
        {/* <MyPageItem image={keywordReview} hoverImage={keywordReviewColor} text="키워드리뷰" /> */}
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

      {isOutletVisible && ( // isOutletVisible이 true일 때만 Outlet 보이도록
        <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white overflow-y-auto">
          <div className="relative top-16 flex justify-center items-center ">
            <DetailViewHeader
              closeButtonImage={xmark}
              onClose={handleCloseButtonClick}
            ></DetailViewHeader>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
