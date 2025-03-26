import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import MyPageItem from './MyPageItem';
import { Outlet } from 'react-router-dom';
import { authApiService } from '../../api/authApi';
import DetailViewHeader from '../common/DetailViewHeader';
import instance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

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
  const [userInfo, setUserInfo] = useState(null);
  const [isOutletVisible, setIsOutletVisible] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await authApiService.getUserInfo();
      if (response && response.data) {
        setUserInfo(response.data);
      } else {
        throw new Error('응답 데이터가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      alert('사용자 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <>
        <div>로딩 중...</div>
        <button
          className="w-full text-center cursor-pointer outline-none"
          onClick={() => logoutUser(dispatch)}
        >
          로그아웃
        </button>
      </>
    );
  }

  const handleItemClick = () => {
    setIsOutletVisible(true); // Outlet 보이도록 상태 변경
  };

  const handleCloseButtonClick = () => {
    setIsOutletVisible(false); // close 버튼 클릭 시 Outlet을 숨김
    const navigate = useNavigate(); // ✅ useNavigate 훅 사용

    const handleLogout = async () => {
      try {
        await instance.post('/logout');

        console.log('✅ 로그아웃 성공! 이제 액세스 토큰을 삭제합니다.');
      } catch (error) {
        console.error('❌ 로그아웃 실패:', error);
      }

      // ✅ 1. 액세스 토큰 삭제
      localStorage.removeItem('accessToken');
      console.log(
        '🗑️ 액세스 토큰 삭제 완료! 현재 localStorage:',
        localStorage.getItem('accessToken'),
      );
      // ✅ 2. 홈으로 이동
      navigate('/');
    };

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
            <button
              className="w-full text-center cursor-pointer outline-none"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="relative top-30 h-80 w-85 mx-auto flex flex-col justify-between">
          <MyPageItem
            image={myReview}
            hoverImage={myReviewColor}
            text="내가 남긴 리뷰"
            navigateTo="/mypage/reviews"
            token={token}
            onClick={handleItemClick} // 클릭 시 상태 변경
          />
          <MyPageItem image={keywordReview} hoverImage={keywordReviewColor} text="키워드리뷰" />
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
            className="relative top-90 h-10 cursor-pointer outline-none"
            onClick={() => alert('회원탈퇴')}
          >
            회원 탈퇴하기
          </button>
        </div>

        {isOutletVisible && ( // isOutletVisible이 true일 때만 Outlet 보이도록
          <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white overflow-y-auto">
            <DetailViewHeader
              closeButtonImage={xmark}
              onClose={handleCloseButtonClick}
            ></DetailViewHeader>
            <Outlet />
          </div>
        )}
      </div>
    );
  };
}
