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
import LoginForm from 'pages/admin/login-form';

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
          element: <Navigate to="/articles" />,
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
              element: <LoginForm />,
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
                  path: ':articleId',
                  children: [
                    {
                      path: 'edit',
                      element: <EditArticlePage />,
                    },
                  ],
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
