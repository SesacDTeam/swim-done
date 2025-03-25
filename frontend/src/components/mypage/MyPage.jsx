import React from 'react';
import MyPageItem from './MyPageItem';
import { useSelector } from 'react-redux';
import instance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

import {
  profile,
  myReview,
  keywordReview,
  contactUs,
  keywordReviewColor,
  myReviewColor,
  contactUsColor,
} from '../../utils/staticImagePath';

function logout() {
  alert('로그아웃');
}

function removeUser() {
  alert('회원탈퇴');
}

export default function MyPage() {
  const nickName = useSelector((state) => state.user.nickName);
  const email = useSelector((state) => state.user.email);
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
            <div className="text-2xl pretendard-bold mb-1">{nickName} 님</div>
            <div className="text-2xl pretendard-bold text-blue01">오늘도 즐수하세요!</div>
          </div>
          <div>{email}</div>
        </div>
        <div className="w-20 h-18">
          <img src={profile} alt="" className="h-full w-full" />
          <button className="w-full text-center cursor-pointer outline-none" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
      <div className="relative top-30 h-80 w-85 mx-auto flex flex-col justify-between">
        <MyPageItem image={myReview} hoverImage={myReviewColor} text="내가 남긴 리뷰" />
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
        <button className="relative top-69 h-10 cursor-pointer outline-none" onClick={removeUser}>
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
}
