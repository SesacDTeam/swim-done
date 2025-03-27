import React, { useState } from 'react';
import { markPoolApi } from '../../api/markPoolApi';
import { useSelector } from 'react-redux';
import PoolListItem from '../common/PoolListItem';
import { logo } from '../../utils/staticImagePath';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import NoContent from '../common/NoContent';
import { Outlet, useNavigate } from 'react-router';
import useErrorResolver from '../../hooks/useErrorResolver';
import ERROR_DISPLAY_MODE from '../../error/ERROR_DISPLAY_MODE';
import { useToggleMark } from '../../hooks/useToggleMark';

export default function MarkPools() {
  const [markedPools, setMarkedPools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.FALLBACK_UI);
  const { toggleMark } = useToggleMark();

  const getMarkedPools = async () => {
    setIsLoading(true);
    try {
      const data = await markPoolApi.getMyMarkedPools(currentPage);
      setCurrentPage((prev) => prev + 1);
      setMarkedPools((prev) => prev.concat(data.data.poolMarks));

      setHasNext(data.data.hasNext);
    } catch (error) {
      setError(error);
      setHasNext(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onIntersect = async (entry, observer) => {
    if (isLoading || !hasNext) return;
    await getMarkedPools();
  };

  const bottomRef = useInfiniteScroll(onIntersect, hasNext);

  const handlePoolListItemClick = (poolId) => {
    navigate(`${poolId}`);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-3000 flex justify-center bg-white">
          <img src={logo} alt="" className="animate-spin w-30" />
        </div>
      )}
      <div className="p-6">
        <h1 className="pretendard-bold text-2xl mb-4">내가 찜한 수영장</h1>
        <section className="flex flex-col items-center gap-5 mt-10">
          {markedPools.length === 0 ? (
            <NoContent title={'내가 찜한 수영장이 없습니다'}></NoContent>
          ) : (
            markedPools.map((pool, index) => {
              return (
                <PoolListItem
                  key={index}
                  name={pool.name}
                  address={pool.address}
                  isMarked={pool.mark}
                  onToggleMark={() => toggleMark(index, markedPools, setMarkedPools)}
                  onClick={() => handlePoolListItemClick(pool.id)}
                ></PoolListItem>
              );
            })
          )}
        </section>
        {hasNext && <div ref={bottomRef}></div>}

        {!isDetailViewHidden && (
          <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white overflow-y-scroll">
            <Outlet></Outlet>
          </div>
        )}
      </div>
    </>
  );
}
