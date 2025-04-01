import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import reviewApi from '../../../api/reviewApi';
import ReviewForm from './ReviewForm';
import { useSubmitReview } from '../../../hooks/useSubmitReview';
import AlertModal from '../AlertModal';

export default function CreateReview() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { poolId } = useParams();
  const location = useLocation();
  const poolName = location.state?.poolName;
  const { reviewContent, setReviewContent, handleSubmit, error } = useSubmitReview(
    '',
    async (reviewContent) => {
      return reviewApi.createReview(poolId, reviewContent);
    },
  );

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setReviewContent(inputValue);
    setCanSubmit(inputValue.trim());
  };

  const closeModal = () => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/[^\/]+$/, '');
    navigate(newPath);
  };

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader backButtonImage={back} closeButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="font-pretendard font-bold text-3xl">{poolName}</h1>
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
            message={'소중한 리뷰를 작성해 주셔서 감사합니다!'}
            onConfirm={closeModal}
          />
        )}
      </main>
    </>
  );
}
