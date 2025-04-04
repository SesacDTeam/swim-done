import { useState } from 'react';
import ERROR_DISPLAY_MODE from '../error/ERROR_DISPLAY_MODE';
import useErrorResolver from './useErrorResolver';
import RequestError from '../error/RequestError';

export const useSubmitReview = (content = null, submitApi) => {
  const { error, setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const [reviewContent, setReviewContent] = useState(content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      setError(new RequestError('리뷰를 작성해 주세요!'));
      return;
    }

    try {
      await submitApi(reviewContent);
    } catch (error) {
      setError(error);
      return false
    }

    return true
  };

  return { reviewContent, setReviewContent, handleSubmit, error };
};
