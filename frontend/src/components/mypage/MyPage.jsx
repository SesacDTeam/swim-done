import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyPageItem from './MyPageItem';
import { Outlet, useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import { logout } from '../../store/slices/authSlice';
import userApi from '../../api/userApi';
import useErrorResolver from '../../hooks/useErrorResolver';
import ERROR_DISPLAY_MODE from '../../error/ERROR_DISPLAY_MODE';
import LoadingSpinner from '../common/LoadingSpinner';
import { showLoading, hideLoading } from '../../store/slices/loadingSlice';

import {
  profile,
  myReview,
  contactUs,
  myReviewColor,
  contactUsColor,
} from '../../utils/staticImagePath';

export default function MyPage() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.FALLBACK_UI);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch(showLoading());
      try {
        const response = await userApi.getUserInfo();
        setUserInfo(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoadingData(false);
        dispatch(hideLoading());
      }
    };
    getUserInfo();
  }, [dispatch, setError]);

  const handleMyReviewsClick = () => {
    navigate('reviews');
  };

  const handleLogout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    try {
      await instance.post('/logout');
      dispatch(logout());
      alert('로그아웃이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생', error);
    }
  };

  const handleWithdraw = async () => {
    if (!window.confirm('정말 회원 탈퇴하시겠습니까?')) return;

    try {
      await instance.delete('/withdraw');
      dispatch(logout());
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (error) {
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  // if (isLoading || !userInfo) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="select-none">
      {isLoadingData ? ( // 데이터가 로딩 중일 때는 로딩 UI만 표시
        <LoadingSpinner />
      ) : (
        <>
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
              <img src={profile} alt="프로필" className="h-full w-full" />
              <button
                className="w-full text-center cursor-pointer outline-none"
                onClick={handleLogout}
              >
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
        </>
      )}
    </div>
  );
}
