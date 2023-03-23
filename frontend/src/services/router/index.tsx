import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import AuthContextProvider from 'services/auth';

import MainLayout from 'layouts/main';
import HomePage from 'pages/home';
import NotFoundPage from 'pages/not-found';
import AdminPage from 'pages/admin';
import AboutPage from 'pages/about';
import RequireAuth from './require-auth';
import MyArticlesPage from 'pages/admin/my-articles';
import CreateArticlePage from 'pages/admin/create-article';
import EditArticlePage from 'pages/admin/edit-article';
import ArticlePage from 'pages/article';
import LoginPage from 'pages/admin/login';

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
          element: <Navigate to="/articles" replace />,
        },
        {
          path: '/articles',
          element: <HomePage />,
          children: [
            {
              path: ':page',
              element: <HomePage />,
            },
          ],
        },
        {
          path: '/article/:articleId',
          element: <ArticlePage />,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
        {
          path: '/admin',
          element: <AdminPage />,
          children: [
            {
              path: 'login',
              element: <LoginPage />,
            },
            {
              path: 'articles',
              element: <RequireAuth to="/admin" />,
              children: [
                {
                  path: '',
                  element: <MyArticlesPage />,
                },
                {
                  path: 'create',
                  element: <CreateArticlePage />,
                },
                {
                  path: ':articleId/edit',
                  element: <EditArticlePage />,
                },
                {
                  path: '*',
                  element: <Navigate to="/admin/articles" />,
                },
              ],
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
