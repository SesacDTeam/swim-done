import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DetailViewHeader from '../DetailViewHeader';
import { poolApi } from '../../../api/poolApi';
import { xmark, back } from '../../../utils/staticImagePath';

export default function CreateReview() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { poolId } = useParams();
  const [poolDetail, setPoolDetail] = useState();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     const response = await authApi.login(formData);
  //     const data = response.data;

  //     const { token } = data.data;
  //     dispatch(login(token));
  //     alert('로그인 성공');
  //     navigate('/calendar');
  //   } catch (err) {
  //     setError(err.response.data.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const navigate = useNavigate();

  // const toDetail = () => {
  //   navigate('/details');
  // };
  
  useEffect(() => {
    (async () => {
      // TODO: 로딩 처리, 에러 핸들링
      const data = await poolApi.getPoolDetail(poolId);
      const poolDetailData = data.data;
      setPoolDetail(poolDetailData);
    })();
  }, [poolId]);

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <DetailViewHeader backButtonImage={back} closeButtonImage={xmark}></DetailViewHeader>
        <section className="w-[80%] flex flex-col items-center mb-10">
          <h1 className="pretendard-bold text-3xl">{poolDetail?.name}</h1>
        </section>

        <section className='w-150 mt-30 flex flex-col'>
          <textarea
            className="pretendard-medium text-xl w-full h-50 border border-gray-400 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue02 transition-all resize-none"
            id="createReview"
            name="createReview"
            placeholder="실제 이용하신 후기를 자유롭게 남겨 주세요."
          >
          </textarea>
          {/* <form>
            <input
              className="pretendard-medium text-xl w-full border-b border-gray-400 p-2 mb-2 focus:outline-none"
              type="text"
              id="createReview"
              name="createReview"
              placeholder="실제 이용하신 후기를 자유롭게 남겨 주세요."
            />
          </form> */}
          <button
            className="pretendard-medium text-xl bg-blue02/10 rounded-[10px] px-4 py-2 mt-4 self-end"
            type="submit">
            제출
          </button>
        </section>
      </main>
    </>
  );
}
