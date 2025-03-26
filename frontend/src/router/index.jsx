import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../components/mypage/MyPage';
import PoolList from '../components/poollist/PoolList';
import MarkPools from '../components/markpools/MarkPools';

import PoolDetail from '../components/common/poolDetail/PoolDetail';
import SubmitImage from '../components/common/submitImage/SubmitImage';
import CreateReview from '../components/common/createreview/CreateReview';
import LoginRedirect from '../pages/LoginRedirect';
import NotFound from '../pages/NotFound';
import AuthenticateRoute from '../components/common/AuthenticateRoute';
import store from '../store/store';
import { hideListBar, showListBar } from '../store/slices/listBarSlice';
import { hideDetailView, showDetailView } from '../store/slices/detailViewSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    loader: () => {
      store.dispatch(hideListBar());
    },
    children: [
      // 가장 바깥
      {
        path: '/mypage',
        element: (
          <AuthenticateRoute
            cancleAction={() => {
              store.dispatch(hideListBar());
              sessionStorage.removeItem('selectedIndex');
            }}
          >
            <MyPage></MyPage>
          </AuthenticateRoute>
        ),
        loader: () => {
          store.dispatch(hideDetailView());
          store.dispatch(showListBar());
        },
        // children: [
        //   {
        //     path: 'reviews',
        //     element: <내가작성한리뷰></내가작성한리뷰>,
        //   },
        // ],
      },
      {
        path: '/pools',
        element: <PoolList></PoolList>,
        loader: () => {
          store.dispatch(showListBar());
          store.dispatch(hideDetailView());
        },
        children: [
          {
            path: '/pools/:poolId',
            element: <PoolDetail></PoolDetail>,
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/submitted-images',
            element: (
              <AuthenticateRoute>
                <SubmitImage></SubmitImage>
              </AuthenticateRoute>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/reviews',
            element: (
              <AuthenticateRoute>
                <CreateReview></CreateReview>
              </AuthenticateRoute>
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
          <AuthenticateRoute
            cancleAction={() => {
              store.dispatch(hideListBar());
              sessionStorage.removeItem('selectedIndex');
            }}
          >
            <MarkPools></MarkPools>
          </AuthenticateRoute>
        ),
        loader: () => {
          store.dispatch(hideDetailView());
          store.dispatch(showListBar());
        },
        children: [
          {
            path: ':poolId',
            element: <PoolDetail></PoolDetail>,
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/submitted-images',
            element: (
              <AuthenticateRoute>
                <SubmitImage></SubmitImage>
              </AuthenticateRoute>
            ),
            loader: () => {
              store.dispatch(showDetailView());
            },
          },
          {
            path: ':poolId/reviews',
            element: (
              <AuthenticateRoute>
                <CreateReview></CreateReview>
              </AuthenticateRoute>
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
    element: <Login></Login>,
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
