import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const Layout = lazy(() => import('@/components/layout'))
const Home = lazy(() => import('@/pages/home'))
const Auth = lazy(() => import('@/pages/auth'))
const Profile = lazy(() => import('@/pages/profile'))
const Editor = lazy(() => import('@/pages/editor'))
const Article = lazy(() => import('@/pages/article'))
const Settings = lazy(() => import('@/pages/settings'))

const routes = createBrowserRouter([
  { path: '/', element: <Navigate to='/home' /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/register', element: <Auth /> },
      { path: '/login', element: <Auth /> },
      { path: '/profile/:username', element: <Profile /> },
      { path: '/settings', element: <Settings /> },
      { path: '/editor', element: <Editor /> },
      { path: '/editor/:slug', element: <Editor /> },
      { path: '/article/:slug', element: <Article /> }
    ]
  }
])

export default routes
