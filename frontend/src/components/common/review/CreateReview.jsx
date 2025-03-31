import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import reviewApi from '../../../api/reviewApi';
import ReviewForm from './reviewForm';
import { useSubmitReview } from '../../../hooks/useSubmitReview';

export default function CreateReview() {
  const [canSubmit, setCanSubmit] = useState(false);

  const { poolId } = useParams();
  const location = useLocation();
  const poolName = location.state?.poolName;
  const { reviewContent, setReviewContent, handleSubmit } = useSubmitReview(
    '',
    async (reviewContent) => {
      reviewApi.createReview(poolId, reviewContent);
    },
  );

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setReviewContent(inputValue);
    setCanSubmit(inputValue.trim());
  };

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader backButtonImage={back} closeButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="font-pretendard font-bold text-3xl">{poolName}</h1>
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
