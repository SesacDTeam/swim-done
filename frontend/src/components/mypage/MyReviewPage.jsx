import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { myPage } from '../../api/myPage'; // API 호출 함수 import
import DetailViewHeader from '../common/DetailViewHeader';
import { xmark } from '../../utils/staticImagePath';
import MyReviewPageItem from './MyReviewPageItem';

export default function MyReviewPage() {
  const token = useSelector((state) => state.auth.accessToken); // Redux에서 token 가져오기

  const [reviews, setReviews] = useState([]); // 기본값을 빈 배열로 설정
  const [totalCount, setTotalCount] = useState(0);

  const dummyReviews = [
    {
      poolName: '강북웰빙스포츠센터',
      createdAt: '2025-03-20T12:00:00Z',
      content: '이 제품 정말 좋아요! 강력 추천합니다.',
    },
    {
      poolName: '강서빅토리스포츠센터',
      createdAt: '2025-03-21T14:30:00Z',
      content: '가격 대비 성능이 뛰어나네요.',
    },
    {
      poolName: '사용자3',
      createdAt: '2025-03-22T09:15:00Z',
      content: '배송이 빨라서 좋았습니다.',
    },
    {
      poolName: '사용자3',
      createdAt: '2025-03-22T09:15:00Z',
      content: '배송이 빨라서 좋았습니다.',
    },
  ];

  // 더미 데이터 사용
  const poolDetail = {
    reviews: dummyReviews,
  };

  useEffect(() => {
    if (!token) return; // token이 없으면 API 호출을 하지 않음

    const fetchReviews = async () => {
      try {
        const data = await myPage.getMyReview(token, 0, 10); // 0 페이지, 10개씩 가져오기
        setReviews(data.reviews || []); // data.reviews가 undefined일 경우 빈 배열로 설정
        setTotalCount(data.totalCount); // 총 리뷰 수 설정
      } catch (error) {
        console.error('리뷰를 가져오는 데 실패했습니다', error);
      }
    };

    fetchReviews();
  }, [token]); // token이 변경될 때마다 호출

  // 날짜 형식 변환 함수
  const extractDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      <DetailViewHeader closeButtonImage={xmark}></DetailViewHeader>
      <div>
        <div className="top-15 pretendard-bold text-2xl text-center">내가 남긴 리뷰</div>
        <h2 className="self-start pretendard-semibold text-2xl ml-10 mt-10">리뷰 ({totalCount})</h2>
      </div>
      <div className="bg-green-200 w-[95%] mx-auto">
        {poolDetail.reviews.map((review, index) => (
          <MyReviewPageItem
            key={index}
            poolName={review.poolName}
            createdAt={extractDate(review.createdAt)}
            content={review.content}
          />
        ))}
      </div>
    </>
  );
}
