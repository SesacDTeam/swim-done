import React, { useEffect, useRef, useState } from 'react';
import { xmark } from '../../../utils/staticImagePath';
import DetailViewHeader from '../DetailViewHeader';
import ReviewListItem from './ReviewListItem';
import { poolApi } from '../../../api/poolApi';
import { Link, useParams } from 'react-router';
import { extractDate } from '../../../utils/extractDate';
import useErrorResolver from '../../../hooks/useErrorResolver';
import Timetable from './TimeTable';

// 로딩 관련
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { showLoading, hideLoading } from '../../../store/slices/loadingSlice';

export default function PoolDetail() {
  const mapContainer = useRef();
  const { poolId } = useParams();
  const [poolDetail, setPoolDetail] = useState(null);
  const mapRef = useRef(null);
  const { setError } = useErrorResolver();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(showLoading());
    setIsDataLoaded(false);

    (async () => {
      try {
        const data = await poolApi.getPoolDetail(poolId);
        setPoolDetail(data.data);
        setIsDataLoaded(true);
      } catch (error) {
        setError(error);
      } finally {
        dispatch(hideLoading());
      }
    })();
  }, [poolId]);

  useEffect(() => {
    if (!isLoading && poolDetail && mapContainer.current) {
      let mapOption = {
        center: new kakao.maps.LatLng(poolDetail.latitude, poolDetail.longitude),
        level: 3,
      };

      mapRef.current = new kakao.maps.Map(mapContainer.current, mapOption);

      const marker = new kakao.maps.Marker({
        position: mapOption.center,
      });
      marker.setMap(mapRef.current);
    }
  }, [isLoading, poolDetail]);

  if (!isDataLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex flex-col items-center w-full">
      <DetailViewHeader closeButtonImage={xmark}></DetailViewHeader>
      <section className="w-[80%] flex flex-col items-center mb-10">
        <h1 className="font-bold text-3xl mb-1">{poolDetail?.name}</h1>
        <p className="text-body01 mb-10">{poolDetail?.address}</p>
        <div ref={mapContainer} className="w-full h-100"></div>
      </section>
      <section className="relative border-1 w-[80%] rounded-2xl border-blue01 bg-blue02/20 pretendard-normal flex flex-col justify-center gap-1 px-4 pt-10 pb-4">
        <Timetable schedule={poolDetail?.swimmingTimes}></Timetable>
        <div className="text-body01">
          <div>{poolDetail?.additionalInfo}</div>
          <div>{poolDetail?.parking}</div>
          <div>
            {poolDetail?.name}(
            <a href={poolDetail?.link} className="text-blue-600" target="_blank" rel="noreferrer">
              {poolDetail?.link}
            </a>
            )
          </div>
        </div>
        <Link to="submitted-images" className="self-end" state={{ poolName: poolDetail?.name }}>
          <button className="bg-blue01 w-35 h-10 rounded-[10px] text-white pretendard-normal text-xs">
            수정 제안하기
          </button>
        </Link>
      </section>
      <section className="text-right w-[80%] text-sm text-body01 mb-15">
        <div>위 정보의 출처는 '{poolDetail?.name}' 홈페이지입니다.</div>
        <div>
          현재 시점과 다른 정보일 수 있으니, 업데이트가 필요한 정보는 수정 제안 부탁드립니다.
        </div>
      </section>
      <section className="flex flex-col items-center w-[80%] mb-10">
        <h2 className="self-start pretendard-semibold text-2xl">리뷰</h2>
        <Link to="reviews" className="self-end" state={{ poolName: poolDetail?.name }}>
          <button className="text-white bg-blue01 w-30 h-10 rounded-[10px] pretendard-normal text-xs">
            리뷰 쓰러가기
          </button>
        </Link>
        {poolDetail?.reviews.map((review, index) => (
          <ReviewListItem
            key={index}
            nickname={review.authorNickname}
            createdAt={extractDate(review.createdAt)}
            content={review.content}
          ></ReviewListItem>
        ))}
      </section>
    </main>
  );
}
