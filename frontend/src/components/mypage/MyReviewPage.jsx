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

  const fetchReviews = async (reset = false) => {
    if (isLoadingRef.current) return;

    if (reset) {
      pageRef.current = 0;
      hasMoreRef.current = true;
      setReviews([]);
    }

    if (!hasMoreRef.current) return;

    setIsFetching(true);
    isLoadingRef.current = true;

    try {
      const data = await myPage.getMyReview(token, pageRef.current, 5);

      setReviews((prev) => (reset ? data.data.reviews : [...prev, ...data.data.reviews]));
      setTotalCount(data.data.totalCount);

      hasMoreRef.current = data.data.hasNext;
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

  // `totalCount`가 변경될 때마다 실행
  useEffect(() => {
    fetchReviews(true); // 리뷰 개수가 0으로 변경되면 초기화된 상태로 다시 불러오기
  }, [totalCount]);

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
            reviewId={review.reviewId}
            poolName={review.poolName}
            createdAt={extractDate(review.timestamp)}
            content={review.content}
            fetchReviews={fetchReviews}
            setTotalCount={setTotalCount}
          />
        ))}
      </div>

      {/* 무한스크롤 트리거: 이 요소가 화면에 보이면 새로운 리뷰를 불러옵니다. */}
      <div ref={observerTarget} className="h-20 relative -mt-10"></div>
    </>
  );
}
