import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import reviewApi from '../../../api/reviewApi';

export default function CreateReview() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  const { poolId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const poolName = location.state?.poolName || '수영장 없음';

  const handleChange = async (e) => {
    setReviewContent(e.target.value); // 입력된 값을 reviewText 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 리뷰 없을 때 (trim 써서 공백만 입력된 경우도 막음)
    if (!reviewContent.trim()) {
      alert('리뷰를 작성해 주세요!');
      return;
    }

    try {
      const response = await reviewApi.createReview(poolId, reviewContent);
      console.log(response);
      navigate(`/mark-pools/${poolId}`);
      alert('리뷰 작성 성공!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader backButtonImage={back} closeButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="pretendard-bold text-3xl">{poolName}</h1>
        </section>

        <section className="w-150 mt-30 flex flex-col">
          <form onSubmit={handleSubmit}>
            <textarea
              className="pretendard-medium text-xl w-full h-50 border border-gray04 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue02 transition-all resize-none"
              id="createReview"
              name="createReview"
              placeholder="실제 이용하신 후기를 자유롭게 남겨 주세요."
              value={reviewContent}
              onChange={handleChange}
            ></textarea>
            <button
              // className={`pretendard-medium text-xl`}
              className={` pretendard-medium text-xl rounded-[10px] px-4 py-2 mt-4 float-right ${reviewContent.trim() ? 'bg-blue02/10 cursor-pointer' : 'bg-gray04/10 cursor-not-allowed'  } `}
              type="submit"
            >
              제출
            </button>
          </form>
          {/* TODO: input태그랑 textarea태그 중에 어울리는 것 결정 예정 */}
          {/* <form>
            <input
              className="pretendard-medium text-xl w-full border-b border-gray-400 p-2 mb-2 focus:outline-none"
              type="text"
              id="createReview"
              name="createReview"
              placeholder="실제 이용하신 후기를 자유롭게 남겨 주세요."
            />
          </form> */}
        </section>
      </main>
    </>
  );
}
