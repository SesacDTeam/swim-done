import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import reviewApi from '../../../api/reviewApi';
import useErrorResolver from '../../../hooks/useErrorResolver';
import ERROR_DISPLAY_MODE from '../../../error/ERROR_DISPLAY_MODE';
import RequestError from '../../../error/RequestError';
import ReviewForm from './reviewForm';

export default function CreateReview() {
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const { poolId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const poolName = location.state?.poolName;

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setReviewContent(inputValue);
    setCanSubmit(inputValue.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 리뷰 없을 때 (trim 써서 공백만 입력된 경우도 막음)
    if (!reviewContent.trim()) {
      setError(new RequestError('리뷰를 작성해 주세요!'));
      return;
    }

    try {
      await reviewApi.createReview(poolId, reviewContent);
      navigate(-1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
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
