import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../components/mypage/MyPage';
import PoolList from '../components/poollist/PoolList';
import MarkPools from '../components/markpools/MarkPools';
import LoginRedirect from '../pages/LoginRedirect';
import Test from '../pages/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
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
        // children: [
        //   {
        //     // 수영장 디테일
        //     path: ':poolId',
        //     element: <수영장디테일></수영장디테일>,
        //   },
        //   {
        //     // 제보하기
        //     path: 'submitted-images',
        //     element: <제보하기></제보하기>,
        //   },
        //   {
        //     // 리뷰작성
        //     path: 'reviews',
        //     element: <리뷰작성></리뷰작성>,
        //   },
        // ],
      },
      {
        path: '/mark-pools',
        element: <MarkPools></MarkPools>,
        // children: [
        //   {
        //     // 수영자 디테일
        //     path: ':poolId',
        //     element: <수영장디테일></수영장디테일>,
        //   },
        //   {
        //     // 제보하기
        //     path: 'submitted-images',
        //     element: <제보하기></제보하기>,
        //   },
        //   {
        //     // 리뷰작성
        //     path: 'reviews',
        //     element: <리뷰작성></리뷰작성>,
        //   },
        // ],
      },
    ],
  },

  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/login-success',
    element: <LoginRedirect></LoginRedirect>
  },
  // 테스트 페이지임 (마이페이지 생성 전)
  {
    path: '/test',
    element: <Test></Test>
  }
]);

export default router;
