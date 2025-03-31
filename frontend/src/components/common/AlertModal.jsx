import React from 'react';

export default function AlertModal({ message, onClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray03/60 flex justify-center items-center z-10000">
      <div className="bg-white w-100 h-50 rounded-2xl flex flex-col items-center justify-between pt-6 overflow-hidden">
        <div className="mt-10 text-center pretendard-medium">
          <div>{message}</div>
        </div>
        <div className="flex w-full h-12">
          <button className="flex-1 bg-blue01 text-white" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
