import React, { useState, useEffect } from 'react';
import { markPoolApi } from '../../api/markPoolApi';
import { useSelector, useDispatch } from 'react-redux';
import PoolListItem from '../common/PoolListItem';
import { logo } from '../../utils/staticImagePath';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import NoContent from '../common/NoContent';
import { Outlet, useNavigate } from 'react-router';
import useErrorResolver from '../../hooks/useErrorResolver';
import ERROR_DISPLAY_MODE from '../../error/ERROR_DISPLAY_MODE';
import { useToggleMark } from '../../hooks/useToggleMark';
import LoadingSpinner from '../common/LoadingSpinner';
import { hideLoading } from '../../store/slices/loadingSlice';

export default function MarkPools() {
  const [markedPools, setMarkedPools] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.FALLBACK_UI);
  const { toggleMark } = useToggleMark();

  const getMarkedPools = async () => {
    try {
      const data = await markPoolApi.getMyMarkedPools(currentPage);
      setCurrentPage((prev) => prev + 1);
      setMarkedPools((prev) => prev.concat(data.data.poolMarks));

      setHasNext(data.data.hasNext);
    } catch (error) {
      setError(error);
      setHasNext(false);
    } finally {
      setIsLoadingData(false);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때, 마크된 수영장 목록을 가져옵니다.
    getMarkedPools();
  }, []);

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
      {isLoadingData ? ( // 데이터가 로딩 중일 때는 로딩 UI만 표시
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}
