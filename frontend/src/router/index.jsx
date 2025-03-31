import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../components/mypage/MyPage';
import PoolList from '../components/poollist/PoolList';
import MarkPools from '../components/markpools/MarkPools';
import PoolDetail from '../components/common/pooldetail/PoolDetail';
import SubmittedImage from '../components/common/submittedimage/SubmittedImage';
import CreateReview from '../components/common/createreview/CreateReview';
import LoginRedirect from '../pages/LoginRedirect';
import NotFound from '../pages/NotFound';
import AuthenticateRoute from '../components/common/AuthenticateRoute';
import store from '../store/store';
import { hideListBar, showListBar } from '../store/slices/listBarSlice';
import { hideDetailView, showDetailView } from '../store/slices/detailViewSlice';
import UnauthenticateRoute from '../components/common/UnauthenticateRoute';
import { setSelectedIndex } from '../store/slices/sideBarSlice';
import ErrorBoundary from '../error/ErrorBoundary';

import MyReviewPage from '../components/mypage/MyReviewPage';
import UpdateReview from '../components/common/updatereview/UpdateReview';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Home></Home>
      </ErrorBoundary>
    ),
    loader: () => {
      store.dispatch(hideListBar());
    },
    children: [
      // 가장 바깥
      {
        path: '/mypage',
        element: (
          <ErrorBoundary>
            <AuthenticateRoute
              cancleAction={() => {
                store.dispatch(hideListBar());
                store.dispatch(setSelectedIndex(null));
              }}
            >
              <MyPage></MyPage>
            </AuthenticateRoute>
          </ErrorBoundary>
        ),
        loader: () => {
          store.dispatch(hideDetailView());
          store.dispatch(showListBar());
        },
        children: [
          {
            path: 'reviews',
            element: <MyReviewPage></MyReviewPage>,
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: 'reviews/:reviewId',
            element: <UpdateReview></UpdateReview>,
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
        ],
      },
      {
        path: '/pools',
        element: (
          <ErrorBoundary>
            <PoolList></PoolList>
          </ErrorBoundary>
        ),
        loader: () => {
          store.dispatch(showListBar());
          store.dispatch(hideDetailView());
          store.dispatch(setSelectedIndex(null));
        },
        children: [
          {
            path: '/pools/:poolId',
            element: (
              <ErrorBoundary>
                <PoolDetail></PoolDetail>
              </ErrorBoundary>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/submitted-images',
            element: (
              <ErrorBoundary>
                <AuthenticateRoute>
                  <SubmittedImage></SubmittedImage>
                </AuthenticateRoute>
              </ErrorBoundary>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/reviews',
            element: (
              <ErrorBoundary>
                <AuthenticateRoute>
                  <CreateReview></CreateReview>
                </AuthenticateRoute>
              </ErrorBoundary>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
        ],
      },
      {
        path: '/mark-pools',
        element: (
          <ErrorBoundary>
            <AuthenticateRoute
              cancleAction={() => {
                store.dispatch(hideListBar());
                store.dispatch(setSelectedIndex(null));
              }}
            >
              <MarkPools></MarkPools>
            </AuthenticateRoute>
          </ErrorBoundary>
        ),
        loader: () => {
          store.dispatch(hideDetailView());
          store.dispatch(showListBar());
        },
        children: [
          {
            path: ':poolId',
            element: (
              <ErrorBoundary>
                <PoolDetail></PoolDetail>
              </ErrorBoundary>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/submitted-images',
            element: (
              <ErrorBoundary>
                <AuthenticateRoute>
                  <SubmittedImage></SubmittedImage>
                </AuthenticateRoute>
              </ErrorBoundary>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/reviews',
            element: (
              <ErrorBoundary>
                <AuthenticateRoute>
                  <CreateReview></CreateReview>
                </AuthenticateRoute>
              </ErrorBoundary>
            ),
            loader: () => {
              store.dispatch(showDetailView());
              return null;
            },
          },
        ],
      },
    ],
  },

  {
    path: '/login',
    element: (
      <UnauthenticateRoute>
        <Login></Login>
      </UnauthenticateRoute>
    ),
  },
  {
    path: '/login-success',
    element: <LoginRedirect></LoginRedirect>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
