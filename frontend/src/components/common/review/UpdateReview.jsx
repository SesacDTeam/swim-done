import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import reviewApi from '../../../api/reviewApi';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import ReviewForm from './ReviewForm';
import { useSubmitReview } from '../../../hooks/useSubmitReview';
import AlertModal from '../AlertModal';

export default function UpdateReview() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { reviewId } = useParams();
  const location = useLocation();
  const poolName = location.state?.poolName;
  const content = location.state?.content;
  const navigate = useNavigate();
  const { reviewContent, setReviewContent, handleSubmit, error } = useSubmitReview(
    content,
    async (reviewContent) => {
      return reviewApi.updateReview(reviewId, reviewContent);
    },
  );

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setReviewContent(inputValue);
    setCanSubmit(content !== inputValue && inputValue.trim());
  };

  const closeModal = () => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/[^\/]+$/, '');
    navigate(newPath);
  };

  return (
    <>
      <div className="relative flex justify-center items-center">
        <DetailViewHeader closeButtonImage={xmark} backButtonImage={back}></DetailViewHeader>
      </div>
      <main className="flex flex-col items-center w-full">
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="pretendard-bold text-3xl">{poolName}</h1>
        </section>
        <ReviewForm
          onSubmit={async (e) => {
            const isSuccess = await handleSubmit(e);
            if (isSuccess) {
              setIsModalOpen(true);
            }
          }}
          onChange={handleChange}
          content={reviewContent}
          canSubmit={canSubmit}
        ></ReviewForm>
        {isModalOpen && (
          <AlertModal
            isSingleButton={true} // 확인 버튼만 표시
            message={'리뷰 내용이 수정되었습니다.'}
            onConfirm={closeModal}
          />
        )}
      </main>
    </>
  );
}
