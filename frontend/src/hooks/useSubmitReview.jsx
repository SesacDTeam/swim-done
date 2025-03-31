import { useState } from 'react';
import ERROR_DISPLAY_MODE from '../error/ERROR_DISPLAY_MODE';
import useErrorResolver from './useErrorResolver';
import { useNavigate } from 'react-router';

export const useSubmitReview = (content = '', submitApi) => {
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const [reviewContent, setReviewContent] = useState(content);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      setError(new RequestError('리뷰를 작성해 주세요!'));
      return;
    }

    try {
      await submitApi(reviewContent);
      setIsModalOpen(true)
    } catch (error) {
      setError(error);
    }
  };

  return { reviewContent, setReviewContent, handleSubmit, isModalOpen };
};
