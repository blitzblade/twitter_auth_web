import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthorizeTweep from './Pages/AuthorizeTweep'
import CallbackPage from './Pages/CallbackPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizeTweep />,
  },
  {
    path: "/twitter_auth_callback",
    element: <CallbackPage />
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
