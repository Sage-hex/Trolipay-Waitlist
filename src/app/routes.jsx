import { createBrowserRouter } from 'react-router-dom';
import WaitlistLanding from '../pages/public/WaitlistLanding.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WaitlistLanding />,
  },
]);
