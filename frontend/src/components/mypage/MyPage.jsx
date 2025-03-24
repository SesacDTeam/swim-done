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

export default function MyPage() {
  return (
    <div className="select-none">
      <h1 className="pretendard-bold text-2xl mt-10 ml-5 sticky text-center">마이페이지</h1>
      <div className="flex justify-between relative top-18 h-26 w-85 mx-auto">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="text-2xl pretendard-bold mb-1">닉네임 님</div>
            <div className="text-2xl pretendard-bold text-blue01">오늘도 즐수하세요!</div>
          </div>
          <div>swim-done@kakao.com</div>
        </div>
        <div>
          <div className="h-17 w-20 rounded-full overflow-hidden flex items-center justify-center">
            <img src={profile} alt="" className="h-full w-full" />
          </div>
          <div className=" text-center cursor-pointer">로그아웃</div>
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
      <div className="relative top-67 h-10 w-85 mx-auto flex justify-center items-center">
        <span className="cursor-pointer">회원 탈퇴하기</span>
      </div>
    </div>
  );
}
