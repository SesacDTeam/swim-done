import React from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import reviewApi from '../../../api/reviewApi';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import ReviewForm from './reviewForm';
import { useSubmitReview } from '../../../hooks/useSubmitReview';

export default function UpdateReview() {
  const [canSubmit, setCanSubmit] = useState(false);
  const { reviewId } = useParams();
  const location = useLocation();
  const poolName = location.state?.poolName;
  const content = location.state?.content;

  const { reviewContent, setReviewContent, handleSubmit } = useSubmitReview(
    content,
    async (reviewContent) => {
      reviewApi.updateReview(reviewId, reviewContent);
    },
  );

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setReviewContent(inputValue);
    setCanSubmit(content !== inputValue && inputValue.trim());
  };

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
