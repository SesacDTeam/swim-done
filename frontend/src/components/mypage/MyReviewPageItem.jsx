import React, { useState } from 'react';
import { swimming, more } from '../../utils/staticImagePath';
import { useNavigate } from 'react-router-dom'; // 추가
import reviewApi from '../../api/reviewApi';
import { useEffect } from 'react';
import AlertModal from '../common/AlertModal';
import ERROR_DISPLAY_MODE from '../../error/ERROR_DISPLAY_MODE';
import useErrorResolver from '../../hooks/useErrorResolver';

export default function MyReviewPageItem({
  poolName,
  createdAt,
  content,
  reviewId,
  fetchReviews,
  setTotalCount,
  onDelete,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);

  useEffect(() => {
    function handleClickOutside(event) {
      // 드롭다운 내부 요소가 아닌 경우에만 닫기
      if (!event.target.closest('.dropdown-menu')) {
        setIsToggled(false);
      }
    }

    if (isToggled) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isToggled]);

  const reviewDelete = () => {
    setModalMessage('정말 삭제하시겠습니까?');
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await reviewApi.deleteReview(reviewId);

      if (response.status === 204) {
        onDelete(reviewId);
        fetchReviews();
        setIsToggled(false);
      } else {
        setError('리뷰 삭제에 실패했습니다.');
      }
    } catch (error) {
      setError('오류 발생');
    }

    // 모달 닫기
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="w-[full] mt-10 relative">
        <div className="flex justify-between items-baseline mb-2">
          <div className="flex gap-3 bg-blue02/30 rounded-xl text-sm pretendard-normal h-12 pl-3 pr-3">
            <img src={swimming} alt="" className="h-full w-8 aspect-square" />
            <div className="flex items-center justify-center text-center w-full text-lg">
              {poolName}
            </div>
          </div>
          <div className="relative flex items-center h-10">
            <div className="pretendard-normal text-xm absolute right-12 w-35 top-7">
              {createdAt}
            </div>
            <img
              src={more}
              alt=""
              className="w-20 relative top-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsToggled(!isToggled);
              }}
            />
            {/* 드롭다운 메뉴 */}
            {isToggled && (
              <div
                className="dropdown-menu absolute top-14 w-32 h-auto right-8 bg-white rounded-md flex flex-col justify-around text-center z-[9999]"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/mypage/reviews/${reviewId}`, {
                      state: {
                        poolName,
                        content,
                      },
                    });
                  }}
                  className="cursor-pointer py-2 hover:bg-blue02/50 bg-blue02/30 rounded-t-md"
                >
                  수정하기
                </button>
                <hr className="border-gray-300 border-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reviewDelete();
                  }}
                  className="cursor-pointer py-2 hover:bg-blue02/50 bg-blue02/30 rounded-b-md"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 텍스트 컨텐츠 */}
        <div className="border-b-[1px] pb-1 border-title relative z-[0]">
          <p className="mb-6 mt-6 text-2xl">{content}</p>
        </div>
      </article>

      {/* 모달 */}
      {isModalOpen && (
        <AlertModal
          isSingleButton={false} // 확인, 취소 버튼 2개 표시
          message={modalMessage}
          onConfirm={handleConfirmDelete} // 삭제 확인 시 실행
          onCancel={handleCloseModal} // 취소 시 실행
        />
      )}
    </>
  );
}