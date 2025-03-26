import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { hideDetailView } from '../../store/slices/detailViewSlice';

export default function DetailViewHeader({ backButtonImage, closeButtonImage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    dispatch(hideDetailView());
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(mark-pools|pools)\/\d+.*$/, '/$1');
    navigate(newPath);
  };

  const handleBackButtonClick = () => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/(\/(mark-pools|pools)\/\d+).*/, '$1');
    navigate(newPath);
  };

  return (
    <>
      <header className="mt-8 w-[90%] flex justify-between">
        {backButtonImage ? (
          <img
            src={backButtonImage}
            alt=""
            className="w-8 aspect-square cursor-pointer"
            onClick={handleBackButtonClick}
          />
        ) : (
          <div className="w-8 aspect-square"></div>
        )}
        <img
          src={closeButtonImage}
          alt=""
          className="w-7 aspect-square cursor-pointer"
          onClick={handleCloseButtonClick}
        />
      </header>
    </>
  );
}
