// MyReviewPageItem.jsx
import React from 'react';
import { swimming, more } from '../../utils/staticImagePath';

export default function MyReviewPageItem({ poolName, createdAt, content }) {
  return (
    <>
      <article className="w-[full] mt-10 ">
        <div className="flex justify-between items-baseline mb-2 ">
          <div className="flex gap-3 bg-blue02 rounded-xl text-sm pretendard-normal h-12">
            <img src={swimming} alt="" className="h-fullw-8 aspect-square" />
            <div className="flex items-center justify-center text-center w-full text-lg">
              {poolName}
            </div>
          </div>
          <div className="flex items-center gap-2 h-10">
            <div className="pretendard-normal text-xs">{createdAt}</div>
            <img src={more} alt="" className="w-15" />
          </div>
        </div>

        <div className="border-b-1 pb-1 border-title">
          <p className="mb-4 text-2xl">{content}</p>
        </div>
      </article>
    </>
  );
}
