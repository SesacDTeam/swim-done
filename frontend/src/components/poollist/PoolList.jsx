import React from 'react';
import { useDispatch } from 'react-redux';
import { showDetailView } from '../../store/slices/detailViewSlice';

export default function PoolList(pools) {
  const dispatch = useDispatch();
  dispatch(showDetailView());

  console.log(pools);

  return <div>PoolList</div>;
}
