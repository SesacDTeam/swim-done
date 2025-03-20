import React, { useEffect, useState } from 'react';
import { markPoolApi } from '../../api/markPoolApi';
import { useSelector } from 'react-redux';
import PoolListItem from '../common/PoolListItem';
import { logo } from '../../utils/staticImagePath';

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

  const handleOnToggleMark = async (index) => {
    const isMarked = markedPools[index].mark;

    setMarkedPools((prev) => {
      const updatedPools = [...prev];
      updatedPools[index] = {
        ...updatedPools[index],
        mark: !isMarked,
      };

      return updatedPools;
    });

    (async () => {
      try {
        if (isMarked) {
          await markPoolApi.deleteMyMarkedPools(token, markedPools[index].id);
        } else {
          await markPoolApi.createMarkedPools(token, markedPools[index].id);
        }
      } catch (error) {
        console.log(error)
      }
    })();
  };

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
              onToggleMark={() => handleOnToggleMark(index)}
            ></PoolListItem>
          );
        })}
      </section>
    </>
  );
}
