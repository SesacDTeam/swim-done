import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router';
import PoolListItem from '../common/PoolListItem';
import { toggleMark } from '../../utils/toggleMark';
import { hideDetailView, showDetailView } from '../../store/slices/detailViewSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useUnmount } from '../../hooks/useUnmount';
import { markPoolApi } from '../../api/markPoolApi';
import { logo } from '../../utils/staticImagePath';

export default function PoolList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const [name, setName] = useState(location.state?.name ?? '알 수 없음');

  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState(useSelector((state) => state.kakaoMap.pools));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const getPools = () => {
    setIsLoading(true);
    try {
      console.log(123);

      //처음에 5개만 보여줬다가 스크롤 내려가면 더 보여주기, 데이터는 pools 에 있음
      setCurrentIndex((prev) => prev + 2); // 인덱스로 바꾸면 될듯
      setHasNext(currentIndex < pools.length);
    } catch {
      // TODO: 에러 핸들링 예정
      console.log('에러');
      setHasNext(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onIntersect = async (entry, observer) => {
    if (isLoading || !hasNext) return;
    getPools();
  };

  const bottomRef = useInfiniteScroll(onIntersect, hasNext);

  const handlePoolListItemClick = (poolId) => {
    dispatch(showDetailView());
    navigate(`${poolId}`);
  };

  useEffect(() => {
    if (location.state?.name) {
      setName(location.state.name);
    }
  }, [location.state]);

  useUnmount(() => {
    dispatch(hideDetailView());
  });

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-3000 flex justify-center bg-white">
          <img src={logo} alt="" className="animate-spin w-30" />
        </div>
      )}
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">
          <span class="text-black">'{name}'</span> 수영할 곳 찾고 계셨죠?
        </h1>
        <section className="flex flex-col items-center gap-5 w-full mt-10">
          {pools.length === 0 ? (
            <NoContent title={'수영장 정보가 없습니다.'}></NoContent>
          ) : (
            pools.slice(0, currentIndex).map((pool, index) => {
              return (
                <PoolListItem
                  key={index}
                  name={pool.name}
                  address={pool.address}
                  isMarked={pool.mark}
                  onToggleMark={() => toggleMark(index, pools, setPools)}
                  onClick={() => handlePoolListItemClick(pool.id)}
                />
              );
            })
          )}
        </section>
      </div>
      {hasNext && <div ref={bottomRef}></div>}
      {!isDetailViewHidden && (
        <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white overflow-y-scroll">
          <Outlet></Outlet>
        </div>
      )}
    </>
  );
}
