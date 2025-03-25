import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import MyPageItem from './MyPageItem';
import { Outlet } from 'react-router-dom';
import {
  profile,
  myReview,
  keywordReview,
  contactUs,
  keywordReviewColor,
  myReviewColor,
  contactUsColor,
} from '../../utils/staticImagePath';

console.log(localStorage.getItem('accessToken'));

function logoutUser(dispatch) {
  // 로그아웃을 위한 액션 디스패치
  dispatch(logout());

  // localStorage에서 토큰 삭제
  localStorage.removeItem('accessToken');

  // 토큰 삭제 후, 필요한 경우 새로 로그인 페이지로 이동할 수도 있음
  alert('로그아웃 되었습니다.');
  // 예: window.location.href = "/login";
}

function removeUser() {
  alert('회원탈퇴');
}

export default function MyPage() {
  const dispatch = useDispatch();
  const nickName = useSelector((state) => state.user.nickName);
  const email = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token); // token을 redux에서 가져옴

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
          <button
            className="w-full text-center cursor-pointer outline-none"
            onClick={() => logoutUser(dispatch)}
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
          token={token} // token을 MyPageItem에 전달
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
        <button className="relative top-90 h-10 cursor-pointer outline-none" onClick={removeUser}>
          회원 탈퇴하기
        </button>
      </div>
      <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
