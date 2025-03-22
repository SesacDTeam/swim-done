import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { hideDetailView } from '../../store/slices/detailViewSlice';

export default function DetailViewHeader({ leftButtonImage, rightButtonImage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <header className="mt-8 w-[90%] flex justify-between">
        {leftButtonImage ? (
          <img
            src={leftButtonImage}
            alt=""
            className="w-8 aspect-square cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        ) : (
          <div className="w-8 aspect-square"></div>
        )}
        <img
          src={rightButtonImage}
          alt=""
          className="w-7 aspect-square cursor-pointer"
          onClick={() => dispatch(hideDetailView())}
        />
      </header>
    </>
  );
}
