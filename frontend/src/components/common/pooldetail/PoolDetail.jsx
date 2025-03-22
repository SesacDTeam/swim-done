import React, { useEffect, useRef, useState } from 'react';
import { xmark } from '../../../utils/staticImagePath';
import DetailViewHeader from '../DetailViewHeader';
import ReviewListItem from './ReviewListItem';
import { poolApi } from '../../../api/poolApi';
import { useParams } from 'react-router';
import { extractDate } from '../../../utils/extractDate';

export default function PoolDetail() {
  const mapContainer = useRef();
  const { poolId } = useParams();
  const [poolDetail, setPoolDetail] = useState();
  const mapRef = useRef();

  useEffect(() => {
    let mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    mapRef.current = new kakao.maps.Map(mapContainer.current, mapOption);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await poolApi.getPoolDetail(poolId);
      setPoolDetail(data.data);

      const movePosition = new kakao.maps.LatLng(data.data.latitude, data.data.longitude);
      mapRef.current.setCenter(movePosition);
    })();
  }, [poolId]);

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader rightButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="pretendard-bold text-3xl">{poolDetail?.name}</h1>
          <p className="text-body01 mb-10">{poolDetail?.address}</p>

          <div ref={mapContainer} className="w-full h-100"></div>
        </section>

        <section className="relative border-1 w-[80%] rounded-2xl border-blue01 bg-blue02/20 text-body01 pretendard-normal flex flex-col justify-center gap-1 px-4 pt-10 pb-4">
          <div>평일: 9:00 ~ 9:50, 10:00 ~ 10:50, 19:00 ~ 19:50</div>
          <div>주말: 9:00 ~ 9:50, 10:00 ~ 10:50, 21:00 ~ 21:50</div>
          <div>{poolDetail?.additionalInfo}</div>
          <div>{poolDetail?.parking}</div>
          <div>
            {poolDetail?.name}(
            <a href={poolDetail?.link} className="text-blue-600" target="_blank" rel="noreferrer">
              {poolDetail?.link}
            </a>
            )
          </div>

          <button className="self-end  bg-blue01 w-35 h-10 rounded-[10px] text-white pretendard-normal text-xs">
            수정 제안하기
          </button>
        </section>
        <section className="text-right w-[80%] text-sm text-body01 mb-15">
          <div>위 정보의 출처는 '{poolDetail?.name}' 홈페이지입니다.</div>
          <div>
            현재 시점과 다른 정보일 수 있으니, 업데이트가 필요한 정보는 수정 제안 부탁드립니다.
          </div>
        </section>

        <section className="flex flex-col items-center w-[80%] mb-10">
          <h2 className="self-start pretendard-semibold text-2xl">리뷰</h2>
          <button className="self-end text-white bg-blue01 w-30 h-10 rounded-[10px] pretendard-normal text-xs">
            리뷰쓰러가기
          </button>
          {poolDetail?.reviews.map((review) => {
            return (
              <ReviewListItem
                nickname={review.authorNickname}
                createdAt={extractDate(review.createdAt)}
                content={review.content}
              ></ReviewListItem>
            );
          })}
        </section>
      </main>
    </>
  );
}
