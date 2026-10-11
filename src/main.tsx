import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import App from './App.tsx';
import './index.css';
import ProtectedRoutes from './components/AuthComponent/ProtectedRoutes.tsx';
import Auth from './pages/Auth.tsx'
import Store from './pages/Store.tsx';
import Home from './pages/Home.tsx';

const Routes = createBrowserRouter(
  [
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/store',
          element: <Store />
        }
      ]
    },
    {
      path: '/signin',
      element: <Auth />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '*',
      element: <NotFound />,
    },

  ]

)



createRoot(document.getElementById('root')!).render(

  <RouterProvider router={Routes} />,

);
