import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import reviewApi from '../../../api/reviewApi';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import ReviewForm from './reviewForm';

export default function UpdateReview() {
  const [error, setError] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [poolName, setPollName] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const initialContent = useRef();

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setReviewContent(inputValue);
    setCanSubmit(initialContent.current !== inputValue && inputValue.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      return;
    }

    if (!reviewContent.trim()) {
      alert('리뷰를 작성해 주세요!');
      return;
    }
    try {
      const response = await reviewApi.updateReview(reviewId, reviewContent);
      if (response) {
        alert('내용이 수정되었습니다.');
        navigate('/mypage/reviews');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getReviewBeforeDate = async () => {
    try {
      const response = await reviewApi.getReviewBeforeDate(reviewId);

      if (response && response.data) {
        setPollName(response.data.data.poolName);
        setReviewContent(response.data.data.content);
        initialContent.current = response.data.data.content;
      } else {
        throw new Error('응답 데이터가 올바르지 않습니다.');
      }
    } catch (error) {}
  };

  useEffect(() => {
    getReviewBeforeDate();
  }, []);

  return (
    <>
      <div className="relative  flex justify-center items-center ">
        <DetailViewHeader closeButtonImage={xmark} backButtonImage={back}></DetailViewHeader>
      </div>
      <main className="flex flex-col items-center w-full">
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="pretendard-bold text-3xl">{poolName}</h1>
        </section>
        <ReviewForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          content={reviewContent}
          canSubmit={canSubmit}
        ></ReviewForm>
      </main>
    </>
  );
}
