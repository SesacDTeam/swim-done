import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import reviewApi from '../../../api/reviewApi';
import useErrorResolver from '../../../hooks/useErrorResolver';
import ERROR_DISPLAY_MODE from '../../../error/ERROR_DISPLAY_MODE';
import RequestError from '../../../error/RequestError';

export default function CreateReview() {
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  const { poolId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const poolName = location.state?.poolName;

  const handleChange = async (e) => {
    setReviewContent(e.target.value); // 입력된 값을 reviewText 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 리뷰 없을 때 (trim 써서 공백만 입력된 경우도 막음)
    if (!reviewContent.trim()) {
      setError(new RequestError("리뷰를 작성해 주세요!"))
      return;
    }

    try {
      await reviewApi.createReview(poolId, reviewContent);
      navigate(-1)
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

        <section className="w-150 mt-30 flex flex-col font-pretendard font-medium">
          <form onSubmit={handleSubmit}>
            <textarea
              className="text-xl w-full h-50 border border-gray04 rounded-lg p-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue02 transition-all resize-none"
              id="createReview"
              name="createReview"
              placeholder="실제 이용하신 후기를 자유롭게 남겨 주세요."
              value={reviewContent}
              onChange={handleChange}
            ></textarea>
            <div className='flex justify-end'>
              <button
                className={`rounded-[10px] px-4 py-2 mt-4 ${reviewContent.trim() ?  'bg-blue01 text-white cursor-pointer' : 'bg-gray04/10 cursor-not-allowed'  } `}
                type="submit"
              >
                제출하기
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
