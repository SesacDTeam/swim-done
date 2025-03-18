import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';

function App() {
  return (
    <>
      <div className="main-container">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
