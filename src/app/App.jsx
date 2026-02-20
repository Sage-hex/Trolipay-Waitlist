import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WaitlistLanding from '../pages/WaitlistLanding.jsx';
import ToastViewport from '../components/ui/Toast.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WaitlistLanding />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastViewport />
    </>
  );
}
