import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../components/mypage/MyPage';
import PoolList from '../components/poollist/PoolList';
import MarkPools from '../components/markpools/MarkPools';
import PoolDetail from '../components/common/pooldetail/PoolDetail';
import SubmittedImage from '../components/common/submittedImage/SubmittedImage';
import CreateReview from '../components/common/createreview/CreateReview';
import LoginRedirect from '../pages/LoginRedirect';
import NotFound from '../pages/NotFound';
import AuthenticateRoute from '../components/common/AuthenticateRoute';
import store from '../store/store';
import { hideListBar, showListBar } from '../store/slices/listBarSlice';
import { hideDetailView, showDetailView } from '../store/slices/detailViewSlice';
import UnauthenticateRoute from '../components/common/UnauthenticateRoute';
import { setSelectedIndex } from '../store/slices/sideBarSlice';

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
              store.dispatch(setSelectedIndex(null));
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
          store.dispatch(setSelectedIndex(null));
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
                <SubmittedImage></SubmittedImage>
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
              store.dispatch(setSelectedIndex(null));
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
                <SubmittedImage></SubmittedImage>
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
