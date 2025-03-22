import React, { useEffect, useRef } from 'react';
import { wave, xmark } from '../../../utils/staticImagePath';
import DetailViewHeader from '../DetailViewHeader';

export default function PoolDetail() {
  const mapContainer = useRef();

  useEffect(() => {
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer.current, mapOption);
  }, []);
  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader rightButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="pretendard-bold text-3xl">강북웰빙스포츠센터</h1>
          <p className="text-body01 mb-10">성동구 자동차시장 1길 64(용답동)</p>

          <div ref={mapContainer} className="w-full h-100"></div>
        </section>

        <section className="relative border-1 w-[80%] h-50 rounded-2xl border-blue01 bg-blue02/20 text-body01 pretendard-normal flex flex-col justify-center gap-1 pl-4">
          <div>평일: 9:00 ~ 9:50, 10:00 ~ 10:50, 19:00 ~ 19:50</div>
          <div>주말: 9:00 ~ 9:50, 10:00 ~ 10:50, 21:00 ~ 21:50</div>
          <div>※1/3/5주 일요일 정기 휴무</div>
          <div>주차 가능</div>
          <div>강북 웰빙 스포츠 센터(https://www.galwol.or.kr/) ← 모양은 담당자 마음</div>
          <button className="absolute right-5 bottom-5  bg-blue01 w-35 h-10 rounded-[10px] text-white pretendard-normal text-xs">
            수정 제안하기
          </button>
        </section>
        <section className="text-right w-[80%] text-sm text-body01 mb-15">
          <div>위 정보의 출처는 ‘강복웰빙스포츠센터’ 홈페이지입니다.</div>
          <div>
            현재 시점과 다른 정보일 수 있으니, 업데이트가 필요한 정보는 수정 제안 부탁드립니다.
          </div>
        </section>

        <section className="flex flex-col items-center w-[80%]">
          <h2 className="self-start pretendard-semibold text-2xl">리뷰</h2>
          <button className="self-end text-white bg-blue01 w-30 h-10 rounded-[10px] pretendard-normal text-xs">
            리뷰쓰러가기
          </button>
          <article className='w-full mb-5'>
            <div className='flex justify-between items-baseline mb-5'>
              <div className="flex gap-3 bg-blue02/20 py-3 pl-3 pr-20 rounded-xl text-sm pretendard-normal">
                <img src={wave} alt=""  className='w-5 aspect-square'/>
                <div>수영조아1234</div>
              </div>

              <div className='pretendard-normal text-xs'>2025.03.14</div>
            </div>
            
            <div className='border-b-1 pb-1 border-title'>
              <p>여기 레일이 너무 좁아요ㅡㅡ 어린애들도  많아서 시끄러워요</p>
            </div>  
          </article>

          <article className='w-full mb-5'>
            <div className='flex justify-between items-baseline mb-5'>
              <div className="flex gap-3 bg-blue02/20 py-3 pl-3 pr-20 rounded-xl text-sm pretendard-normal">
                <img src={wave} alt=""  className='w-5 aspect-square'/>
                <div>수영조아1234</div>
              </div>

              <div className='pretendard-normal text-xs'>2025.03.14</div>
            </div>
            
            <div className='border-b-1 pb-1 border-title'>
              <p>여기 레일이 너무 좁아요ㅡㅡ 어린애들도  많아서 시끄러워요</p>
            </div>  
          </article>
        </section>
      </main>
    </>
  );
}
