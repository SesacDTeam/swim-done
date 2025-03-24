import React, { useState } from 'react';
import HoverItem from './HoverItem';

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
  const [nickName, setNickName] = useState('');
  const [emain, setEmain] = useState('');
  const [userImg, setUserImg] = useState('');

  return (
    <div className="select-none">
      <h1 className="pretendard-bold text-2xl mt-10 ml-5 sticky text-center">마이페이지</h1>
      <div className="flex justify-between relative top-18 h-26 w-85 mx-auto">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="text-2xl pretendard-bold mb-1">{nickName} 님</div>
            <div className="text-2xl pretendard-bold text-blue01">오늘도 즐수하세요!</div>
          </div>
          <div>{emain}</div>
        </div>
        <div className="w-20 h-18">
          <img src={userImg === '' ? profile : userImg} alt="" className="h-full w-full" />
          <button className="w-full text-center cursor-pointer outline-none" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
      <div className="relative top-30 h-80 w-85 mx-auto flex flex-col justify-between">
        <HoverItem image={myReview} hoverImage={myReviewColor} text="내가 남긴 리뷰" />
        <HoverItem image={keywordReview} hoverImage={keywordReviewColor} text="키워드리뷰" />
        <HoverItem
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
