import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import App from './App.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
<<<<<<< HEAD
import AICoachPage from './pages/AICoachPage.jsx';
=======
import OnboardingPage from './pages/OnboardingPage.jsx';
>>>>>>> 7771a7e (Added dashboard and profile prototype)
import PathUI from './pages/PathUI.jsx';
import StoryPage from './pages/StoryPage.jsx';
import AICoachPage from './pages/AICoachPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import './index.css';
import StoryMode from './pages/StoryMode.jsx';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <AuthPage />,
      },
      { path: "coach", element: <AICoachPage /> },
      { path: "path", element: <PathUI /> },
      { path: "story/:levelId", element: <StoryPage /> },
      { path: 'story/play', element: <StoryMode /> },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);