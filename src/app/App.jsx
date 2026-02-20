import { RouterProvider } from 'react-router-dom';
import { router } from './routes.jsx';
import ToastViewport from '../components/ui/Toast.jsx';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastViewport />
    </>
  );
}
