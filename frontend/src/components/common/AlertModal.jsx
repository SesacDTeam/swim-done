import React, { useEffect } from 'react';

export default function AlertModal({
  isSingleButton = false, // 확인 버튼만 있을 때
  message,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray03/60 flex justify-center items-center z-10000">
      <div className="bg-white w-100 h-50 rounded-2xl flex flex-col items-center justify-between pt-6 overflow-hidden">
        <div className="mt-10 text-center pretendard-medium">
          {Array.isArray(message) ? (
            message.map((line, index) => <div key={index}>{line}</div>)
          ) : (
            <div>{message}</div>
          )}
        </div>
        <div className="flex w-full h-12">
          {!isSingleButton && onCancel && (
            <button className="flex-1 bg-gray03 text-white w-full" onClick={onCancel}>
              취소
            </button>
          )}
          <button className="flex-1 bg-blue01 text-white w-full" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
