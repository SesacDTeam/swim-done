import React from 'react';

export default function ReviewForm({ onSubmit, onChange, content, canSubmit }) {
  return (
    <section className="w-150 mt-30 flex flex-col font-pretendard font-medium">
      <form onSubmit={onSubmit}>
        <textarea
          className="text-xl w-full h-50 border border-gray04 rounded-lg p-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue02 transition-all resize-none"
          id="review"
          name="review"
          placeholder="실제 이용하신 후기를 자유롭게 남겨 주세요."
          value={content}
          onChange={onChange}
        ></textarea>
        <div className="flex justify-end">
          <button
            className={`rounded-[10px] px-4 py-2 mt-4 ${canSubmit ? 'bg-blue01 text-white cursor-pointer' : 'bg-gray04/10 cursor-not-allowed'} `}
            type="submit"
          >
            제출하기
          </button>
        </div>
      </form>
    </section>
  );
}
