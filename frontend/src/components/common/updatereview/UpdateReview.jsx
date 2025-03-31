import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import reviewApi from '../../../api/reviewApi';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import AlertModal from '../AlertModal';

export default function UpdateReview() {
  const [error, setError] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [poolName, setPollName] = useState('');
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = async (e) => {
    setReviewContent(e.target.value); // 입력된 값을 reviewText 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      alert('리뷰를 작성해 주세요!'); // TODO: 에러 toast창으로 변경
      return;
    }
    try {
      const response = await reviewApi.updateReview(reviewId, reviewContent);
      if (response) {
        setModalMessage('리뷰 내용이 수정되었습니다!');
        setIsModalOpen(true);
      }
    } catch (err) {
      alert('애러남'); // TODO: 에러 toast창으로 변경
      setError(err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/mypage/reviews'); // 모달 닫은 후 이전 페이지로 돌아가기
  };

  const getReviewBeforeDate = async () => {
    try {
      const response = await reviewApi.getReviewBeforeDate(reviewId);

      if (response && response.data) {
        setPollName(response.data.data.poolName);
        setReviewContent(response.data.data.content);
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

        <section className="w-150 mt-30 flex flex-col">
          <form onSubmit={handleSubmit}>
            <textarea
              className="pretendard-medium text-xl w-full h-50 border border-gray04 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue02 transition-all resize-none"
              id="createReview"
              name="createReview"
              value={reviewContent}
              onChange={handleChange}
            ></textarea>
            <button
              className={` pretendard-medium text-xl rounded-[10px] px-4 py-2 mt-4 float-right ${reviewContent.trim() ? 'bg-blue02/10 cursor-pointer' : 'bg-gray04/10 cursor-not-allowed'} `}
              type="submit"
            >
              제출
            </button>
          </form>
        </section>
      </main>
      {isModalOpen && (
        <AlertModal
          isSingleButton={true} // 확인 버튼만 표시
          message={modalMessage}
          onConfirm={closeModal}
        />
      )}
    </>
  );
}
