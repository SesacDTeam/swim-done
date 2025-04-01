import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router';
import PoolListItem from '../common/PoolListItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { logo } from '../../utils/staticImagePath';
import NoContent from '../common/NoContent';
import { useToggleMark } from '../../hooks/useToggleMark';
import AuthenticateRoute from '../common/AuthenticateRoute';
import { setPools } from '../../store/slices/kakaoMapSlice';

export default function PoolList() {
  const navigate = useNavigate();
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const name = useSelector((state) => state.kakaoMap.name);
  const pools = useSelector((state) => state.kakaoMap.pools);
  const [poolList, setPoolList] = useState(useSelector((state) => state.kakaoMap.pools));

  const [isLoading, setIsLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const { toggleMark, showLoginModal, setShowLoginModal } = useToggleMark();

  const getPools = () => {
    setIsLoading(true);
    try {
      //처음에 5개만 보여줬다가 스크롤 내려가면 더 보여주기, 데이터는 pools 에 있음
      setCurrentIndex((prev) => prev + 2);
      setHasNext(currentIndex < pools.length);
    } catch {
      // TODO: 에러 핸들링 예정
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
    navigate(`${poolId}`);
  };

  useEffect(() => {
    if (name === null) {
      navigate('/');
    }
  }, []);

  useEffect(() => {}, [pools]);

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-3000 flex justify-center bg-white">
          <img src={logo} alt="" className="animate-spin w-30" />
        </div>
      )}

      {showLoginModal && <AuthenticateRoute cancleAction={() => setShowLoginModal(false)} />}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-black">'{name}'</span> 수영할 곳 찾고 계셨죠?
        </h1>
        <section className="flex flex-col items-center gap-5 w-full mt-10">
          {pools?.length === 0 ? (
            <NoContent title={'수영장 정보가 없습니다.'}></NoContent>
          ) : (
            pools?.slice(0, currentIndex).map((pool, index) => {
              return (
                <PoolListItem
                  key={index}
                  name={pool.name}
                  address={pool.address}
                  isMarked={pool.mark}
                  onToggleMark={() => toggleMark(index, poolList, setPoolList)}
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
