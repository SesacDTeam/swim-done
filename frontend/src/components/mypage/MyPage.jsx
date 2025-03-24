import React, { useState } from 'react';

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
  const [verification, setVerification] = useState({
    myReviewVerification: false,
    keywordReviewVerification: false,
    contactUsVerification: false,
  });

  return (
    <>
      <div className="select-none">
        <h1 className="pretendard-bold text-2xl mt-10 ml-5 sticky text-center">마이페이지</h1>
        <div className="flex justify-between relative top-18 h-26 w-85 mx-auto">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="text-2xl pretendard-bold mb-1">닉네임 님</div>
              <div className="text-2xl pretendard-bold text-blue-500">오늘도 즐수하세요!</div>
            </div>
            <div className="-5 pretendard-medium">swim-done@kakao.com</div>
          </div>
          <div>
            <div className="h-17 w-20 rounded-full overflow-hidden flex items-center justify-center">
              <img src={profile} alt="" className="h-full w-full" />
            </div>
            <div className=" text-center cursor-pointer">로그아웃</div>
          </div>
        </div>

        <div className=" relative top-30 h-80 w-85 mx-auto flex flex-col justify-between">
          <div className=" flex h-20 items-center">
            <div>
              <img
                src={verification.myReviewVerification ? myReviewColor : myReview}
                alt=""
                className="w-20 h-15 cursor-pointer"
                onMouseEnter={() =>
                  setVerification({ ...verification, myReviewVerification: true })
                }
                onMouseLeave={() =>
                  setVerification({ ...verification, myReviewVerification: false })
                }
              />
            </div>
            <div
              className="relative ml-8 cursor-pointer"
              onMouseEnter={() => setVerification({ ...verification, myReviewVerification: true })}
              onMouseLeave={() => setVerification({ ...verification, myReviewVerification: false })}
            >
              {verification.myReviewVerification ? (
                <div className="text-2xl text-[#69b5ff]  w-full ">내가 남긴 리뷰</div>
              ) : (
                <div className="text-2xl w-full ">내가 남긴 리뷰</div>
              )}
            </div>
          </div>
          <div className=" flex h-20 items-center">
            <div>
              <img
                src={verification.keywordReviewVerification ? keywordReviewColor : keywordReview}
                alt=""
                className="w-20 h-15 cursor-pointer"
                onMouseEnter={() =>
                  setVerification({ ...verification, keywordReviewVerification: true })
                }
                onMouseLeave={() =>
                  setVerification({ ...verification, keywordReviewVerification: false })
                }
              />
            </div>
            <div
              className="relative ml-8 cursor-pointer"
              onMouseEnter={() =>
                setVerification({ ...verification, keywordReviewVerification: true })
              }
              onMouseLeave={() =>
                setVerification({ ...verification, keywordReviewVerification: false })
              }
            >
              {verification.keywordReviewVerification ? (
                <div className="text-2xl text-[#69b5ff]  w-full ">키워드리뷰</div>
              ) : (
                <div className="text-2xl w-full ">키워드리뷰</div>
              )}
            </div>
          </div>
          <div className=" flex h-20 items-center">
            <div>
              <img
                src={verification.contactUsVerification ? contactUsColor : contactUs}
                alt=""
                className="w-20 h-15 cursor-pointer"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/11e9EqdCulELLjuw7oIisCIXd_DCb_XJBDnTsSJBnjPE/edit',
                    '_blank',
                  )
                }
                onMouseEnter={() =>
                  setVerification({ ...verification, contactUsVerification: true })
                }
                onMouseLeave={() =>
                  setVerification({ ...verification, contactUsVerification: false })
                }
              />
            </div>
            <div
              className="relative ml-8 cursor-pointer"
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/11e9EqdCulELLjuw7oIisCIXd_DCb_XJBDnTsSJBnjPE/edit',
                  '_blank',
                )
              }
              onMouseEnter={() => setVerification({ ...verification, contactUsVerification: true })}
              onMouseLeave={() =>
                setVerification({ ...verification, contactUsVerification: false })
              }
            >
              {verification.contactUsVerification ? (
                <div className="text-2xl text-[#69b5ff]  w-full ">문의하기</div>
              ) : (
                <div className="text-2xl w-full ">문의하기</div>
              )}
            </div>
          </div>
        </div>
        <div className="relative top-67 h-10 w-85 mx-auto flex justify-center items-center">
          <span className="cursor-pointer">회원 탈퇴하기</span>
        </div>
      </div>
    </>
  );
}
