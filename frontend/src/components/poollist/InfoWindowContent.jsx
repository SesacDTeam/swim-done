import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showDetailView } from '../../store/slices/detailViewSlice';
/**
 * @description React 컴포넌트를 인포윈도우 콘텐츠로 활용하기 위한 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.pool - 수영장 이름
 * @returns {JSX.Element} 인포윈도우 콘텐츠 컴포넌트
 */
export default function InfoWindowContent({ pool }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, address, dayOfWeek } = pool;
  const swimmingTimes = pool.swimmingTimes.length ? (
    pool.swimmingTimes.map(({ startTime, endTime }, idx) => (
      <p key={idx}>
        {startTime} ~ {endTime}
      </p>
    ))
  ) : (
    <p className="mb-2">자유 수영 시간이 없습니다.</p>
  );
  const handlePoolListItemClick = (poolId) => {
    dispatch(showDetailView());
    navigate(`pools/${poolId}`);
  };

  return (
    <>
      <h2 className="text-xl font-bold text-black">{name}</h2>
      <p className="text-gray-600 text-sm">{address}</p>
      <div className="mt-2 text-sm text-gray-800">
        <p className="text-gray-600 text-sm">{dayOfWeek}</p>
        {swimmingTimes}
      </div>
      <div
        className="mt-2 text-xs text-blue-500 cursor-pointer hover:underline"
        onClick={() => handlePoolListItemClick(id)}
      >
        * 다른 요일이 궁금하다면? 클릭 후 확인하세요!
      </div>
    </>
  );
}
