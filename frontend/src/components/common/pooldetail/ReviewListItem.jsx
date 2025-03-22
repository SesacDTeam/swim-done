import React from 'react';
import { wave } from '../../../utils/staticImagePath';

export default function ReviewListItem({ nickname, createdAt, content }) {
  return (
    <>
      <article className="w-full mb-5">
        <div className="flex justify-between items-baseline mb-5">
          <div className="flex gap-3 bg-blue02/20 py-3 pl-3 pr-20 rounded-xl text-sm pretendard-normal">
            <img src={wave} alt="" className="w-5 aspect-square" />
            <div>{nickname}</div>
          </div>

          <div className="pretendard-normal text-xs">{createdAt}</div>
        </div>

        <div className="border-b-1 pb-1 border-title">
          <p>{content}</p>
        </div>
      </article>
    </>
  );
}
