import React, { useEffect, useState } from 'react';
import { markPoolApi } from '../../api/markPoolApi';
import { useSelector } from 'react-redux';
import PoolListItem from '../common/PoolListItem';
import { logo } from '../../utils/staticImagePath';
import { toggleMark } from '../../utils/toggleMark';

export default function MarkPools() {
  const [markedPools, setMarkedPools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const data = await markPoolApi.getMyMarkedPools(token);
        setMarkedPools(data.data.poolMarks);
      } catch {
        // TODO: 에러 핸들링 예정
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-3000 flex justify-center bg-white">
          <img src={logo} alt="" className="animate-spin w-30" />
        </div>
      )}
      <h1 className="pretendard-bold text-2xl mt-10 ml-5 sticky">내가 찜한 수영장</h1>
      <section className="flex flex-col items-center gap-5 w-full mt-10">
        {markedPools.map((pool, index) => {
          return (
            <PoolListItem
              key={index}
              title={pool.name}
              address={pool.address}
              isMarked={pool.mark}
              onToggleMark={() => toggleMark(index, markedPools, setMarkedPools, token)}
            ></PoolListItem>
          );
        })}
      </section>
    </>
  );
}
