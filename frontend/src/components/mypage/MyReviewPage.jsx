import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { myPage } from '../../api/myPage';
import MyReviewPageItem from './MyReviewPageItem';

export default function MyReviewPage() {
  const token = useSelector((state) => state.auth.accessToken);

  const [reviews, setReviews] = useState([]); // 리뷰 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 리뷰 개수
  const [isFetching, setIsFetching] = useState(false); // 데이터 로딩 중 여부

  // 무한스크롤 관련 ref들
  // observerTarget: IntersectionObserver가 감시할 요소
  const observerTarget = useRef(null);
  // pageRef: 현재 페이지 번호 (초기값 0)
  const pageRef = useRef(0);
  // hasMoreRef: 더 가져올 데이터가 있는지 여부
  const hasMoreRef = useRef(true);
  // isLoadingRef: API 호출 중 여부
  const isLoadingRef = useRef(false);

  // fetchReviews 함수: API 호출을 통해 리뷰 데이터를 불러오고 상태 업데이트
  const fetchReviews = async () => {
    // 이미 로딩 중이거나 더 불러올 데이터가 없으면 종료
    if (!hasMoreRef.current || isLoadingRef.current) return;

    // 로딩 상태 업데이트
    setIsFetching(true);
    isLoadingRef.current = true;

    try {
      // API 호출: 현재 페이지의 데이터 5개 요청
      const data = await myPage.getMyReview(token, pageRef.current, 5);
      // 기존 리뷰에 새 데이터 추가
      setReviews((prev) => [...prev, ...data.data.reviews]);
      console.log(data.data.hasNext);

      // 총 리뷰 개수 업데이트
      setTotalCount(data.data.totalCount);
      // API에서 전달받은 hasNext 값을 사용해 추가 데이터 존재 여부 업데이트
      hasMoreRef.current = data.data.hasNext;
      // 추가 데이터가 있으면 다음 호출을 위해 페이지 번호 증가
      if (data.data.hasNext) {
        pageRef.current += 1;
      }
    } catch (error) {
      console.error('리뷰를 가져오는 데 실패했습니다', error);
    } finally {
      setIsFetching(false);
      isLoadingRef.current = false;
    }
  };

  // 초기 데이터 로드: 컴포넌트가 마운트될 때 한 번 실행
  useEffect(() => {
    fetchReviews();
  }, []);

  // IntersectionObserver 콜백: observerTarget 요소가 화면에 보이면 fetchReviews 호출
  const handleScroll = useCallback((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
      fetchReviews();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
    });
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleScroll]);

  // 날짜 형식 변환 함수
  const extractDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      <div>
        <div className="top-15 pretendard-bold text-2xl text-center">내가 남긴 리뷰</div>
        <h2 className="self-start pretendard-semibold text-2xl ml-17 mt-10">리뷰 ({totalCount})</h2>
      </div>

      <div className=" w-[90%] mx-auto">
        {reviews.map((review, index) => (
          <MyReviewPageItem
            key={index}
            poolName={review.poolName}
            createdAt={extractDate(review.timestamp)}
            content={review.content}
          />
        ))}
      </div>

      {/* 무한스크롤 트리거: 이 요소가 화면에 보이면 새로운 리뷰를 불러옵니다. */}
      <div ref={observerTarget} className="h-10 relative -mt-10"></div>
    </>
  );
}
