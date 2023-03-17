import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from 'layouts/main';
import HomePage from 'pages/home';
import NotFoundPage from 'pages/not-found';
import AuthContextProvider from 'services/auth';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <AuthContextProvider>
            <MainLayout />
          </AuthContextProvider>
        </>
      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
          children: [
            {
              path: 'articles/:id',
              element: <HomePage />,
            },
            {
              path: 'admin',
              element: <HomePage />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
