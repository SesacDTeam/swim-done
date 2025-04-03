import React, { useEffect, useRef, useState } from 'react';
import DetailViewHeader from '../DetailViewHeader';
import { xmark, back } from '../../../utils/staticImagePath';
import { useLocation, useNavigate, useParams } from 'react-router';
import submittedImageApi from '../../../api/submittedImageApi';
import { defaultUploadImage } from '../../../utils/staticImagePath';
import useErrorResolver from '../../../hooks/useErrorResolver';
import RequestError from '../../../error/RequestError';
import ERROR_DISPLAY_MODE from '../../../error/ERROR_DISPLAY_MODE';
import AlertModal from '../AlertModal';
import LoadingSpinner from '../LoadingSpinner';

export default function SubmittedImage() {
  const { poolId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const poolName = location.state?.poolName;

  const [inputData, setInputData] = useState({ file: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 파일 선택 버튼 클릭 시 input 클릭 이벤트 발생함 (input 숨겨놓음)
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // 프론트에서도 파일 크기 제한함
    const maxSize = 3 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(new RequestError('파일 크기가 너무 큽니다. 3MB 이하로 업로드해 주세요.'));
      return;
    }

    if (file) {
      setInputData({ file });

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 컴포넌트가 언마운트될 때 미리보기 url 정리함
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (!inputData.file) {
      // alert창 대신 토스트로 변경
      setError(new RequestError('파일을 선택해 주세요!'));
      return;
    }

    const formData = new FormData();
    formData.append('file', inputData.file);
    formData.append('poolId', poolId);

    try {
      await submittedImageApi.createImage(formData);
      setModalMessage('이미지를 제보해 주셔서 감사합니다!');
      setIsModalOpen(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/[^\/]+$/, '');
    navigate(newPath);
  };

  return (
    <>
      <main className="flex flex-col items-center w-full font-pretendard">
      {isLoading && <LoadingSpinner backgroundColor={'bg-title/30'} />}
        <DetailViewHeader backButtonImage={back} closeButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="font-bold text-3xl">{poolName}</h1>
          <p className="font-medium text-body01 text-xl mb-10 mt-10">
            수정하실 시간표 이미지를 첨부해 주세요.
          </p>
        </section>

        <div>
          <div
            className="w-90 h-60 flex justify-center items-center border border-gray03 rounded-lg bg-gray-200 cursor-pointer "
            onClick={handleButtonClick}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="업로드된 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img src={defaultUploadImage} alt="기본 이미지" className="w-15 h-15 opacity-50" />
            )}
          </div>

          {/* 제출 영역임 */}
          <form onSubmit={handleSubmit} className="mt-8 flex justify-end gap-4">
            <button
              className={`rounded-[10px] px-4 py-2 mt-4 ${inputData.file ? 'bg-blue01 text-white cursor-pointer' : 'bg-gray04/10 cursor-not-allowed'} `}
              type="submit"
            >
              제출하기
            </button>
            <input
              type="file"
              ref={fileInputRef}
              hidden // 기존의 input file 태그 숨김
              onChange={handleFileChange}
              accept="image/*"
            />
          </form>
        </div>
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
