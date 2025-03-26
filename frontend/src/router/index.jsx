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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    errorElement: <NotFound></NotFound>,
    children: [
      // 가장 바깥
      {
        path: '/mypage',
        element: <MyPage></MyPage>,
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
            element: <SubmittedImage></SubmittedImage>,
          },
          {
            path: ':poolId/reviews',
            element: <CreateReview></CreateReview>,
          },
        ],
      },
      {
        path: '/mark-pools',
        element: <MarkPools></MarkPools>,
        children: [
          {
            path: '/mark-pools/:poolId',
            element: <PoolDetail></PoolDetail>,
          },
          {
            path: '/mark-pools/:poolId/submitted-images',
            element: <SubmittedImage></SubmittedImage>,
          },
          {
            path: '/mark-pools/:poolId/reviews',
            element: <CreateReview></CreateReview>,
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
