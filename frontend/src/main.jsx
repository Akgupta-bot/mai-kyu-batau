import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import AICoachPage from './pages/AICoachPage.jsx';
import PathUI from './pages/PathUI.jsx';
import StoryPage from './pages/StoryPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);