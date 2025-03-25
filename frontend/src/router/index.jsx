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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    errorElement: <NotFound></NotFound>,
    children: [
      // 가장 바깥
      {
        path: '/mypage',
        element: (
          <AuthenticateRoute
            cancleAction={() => {
              store.dispatch(hideListBar());
            }}
          >
            <MyPage></MyPage>
          </AuthenticateRoute>
        ),
        loader: () => {
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
        children: [
          {
            path: ':poolId',
            element: <PoolDetail></PoolDetail>,
          },
          {
            path: ':poolId/submitted-images',
            element: <SubmitImage></SubmitImage>,
          },
          {
            path: ':poolId/reviews',
            element: <CreateReview></CreateReview>,
          },
        ],
      },
      {
        path: '/mark-pools',
        element: (
          <AuthenticateRoute
            cancleAction={() => {
              store.dispatch(hideListBar());
            }}
          >
            <MarkPools></MarkPools>
          </AuthenticateRoute>
        ),
        loader: () => {
          store.dispatch(showListBar());
        },
        children: [
          {
            path: '/mark-pools/:poolId',
            element: <PoolDetail></PoolDetail>,
          },
          {
            path: '/mark-pools/:poolId/submitted-images',
            element: (
              <AuthenticateRoute>
                <SubmitImage></SubmitImage>
              </AuthenticateRoute>
            ),
          },
          {
            path: '/mark-pools/:poolId/reviews',
            element: (
              <AuthenticateRoute>
                <CreateReview></CreateReview>
              </AuthenticateRoute>
            ),
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
]);

export default router;
