import React, { useState, useEffect, useCallback } from 'react';
import { myPageApi } from '../../api/myPageApi';
import MyReviewPageItem from './MyReviewPageItem';
import DetailViewHeader from '../common/DetailViewHeader';
import { xmark } from '../../utils/staticImagePath';
import LoadingSpinner from '../common/LoadingSpinner';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

export default function MyReviewPage() {
  const [reviews, setReviews] = useState([]); // 리뷰 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 리뷰 개수
  const [isFetching, setIsFetching] = useState(false); // 데이터 로딩 중 여부
  const [hasNext, setHasNext] = useState(true); // 다음 페이지 여부
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호

  // 리뷰 데이터 가져오기
  const fetchReviews = useCallback(
    async (page) => {
      if (isFetching || !hasNext) return; // 중복 요청 방지

      setIsFetching(true);

      try {
        const response = await myPageApi.getMyReview(page, 4);
        const { reviews: newReviews, totalCount, hasNext } = response.data;

        setReviews((prev) => (currentPage === 0 ? newReviews : [...prev, ...newReviews])); // 첫 페이지라면 초기화
        setTotalCount(totalCount);
        setHasNext(hasNext);
        setCurrentPage(page + 1);
      } catch (error) {
        console.error('리뷰 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsFetching(false);
      }
    },
    [isFetching, hasNext],
  );

  // `useInfiniteScroll`을 활용하여 무한스크롤 감지
  // const bottomRef = useInfiniteScroll(fetchReviews);
  const bottomRef = useInfiniteScroll(() => fetchReviews(currentPage));

  useEffect(() => {
    setReviews([]); // 기존 데이터 초기화
    setCurrentPage(0);
    setHasNext(true);

    fetchReviews(0);
  }, []);

  const handleDeleteReview = (deletedReviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.reviewId !== deletedReviewId),
    );
    setTotalCount((prev) => Math.max(prev - 1, 0));
  };

  // 날짜 형식 변환 함수
  const extractDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader closeButtonImage={xmark}></DetailViewHeader>

        <div className="top-15 pretendard-bold text-3xl text-center">내가 남긴 리뷰</div>
        <h2 className="self-start pretendard-semibold text-2xl ml-17 mt-10">리뷰 ({totalCount})</h2>

        <div className="w-[90%] mx-auto">
          {reviews.map((review, index) => (
            <MyReviewPageItem
              key={index}
              reviewId={review.reviewId}
              poolName={review.poolName}
              createdAt={extractDate(review.createdAt)}
              content={review.content}
              fetchReviews={fetchReviews}
              setTotalCount={setTotalCount}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>

        {/* 무한스크롤 트리거 */}
        {hasNext && <div ref={bottomRef} className="h-20 relative -mt-10"></div>}

        {isFetching && <LoadingSpinner />}
      </main>
    </>
  );
}
