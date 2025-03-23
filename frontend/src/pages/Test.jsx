import React from 'react';
import authApi from '../api/authApi';


export default function Test() {

  const handleTest = async () => {
    await authApi.test();
  };

  return (
    <>
      <button className='bg-amber-300' onClick={handleTest}>
        테스트
      </button>
    </>
  );
}
