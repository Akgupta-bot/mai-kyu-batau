import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import App from "./App.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Pages
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import PathUI from './pages/PathUI.jsx';
import StoryPage from './pages/StoryPage.jsx';
import AICoachPage from './pages/AICoachPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
<<<<<<< HEAD
import ProfilePage from './pages/ProfilePage.jsx';
<<<<<<< HEAD
import EventsPage from './pages/EventsPage.jsx';

import "./index.css";
import StoryMode from "./pages/StoryMode.jsx";
=======
=======
import ProfilePage from './pages/ProfilePage.jsx'; 
import EventsPage from './pages/EventsPage.jsx';
>>>>>>> e20af91 (Added the Events Page)

import './index.css';
>>>>>>> 7771a7e (Added dashboard and profile prototype)

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
<<<<<<< HEAD
      {
        path: "/",
        element: <LandingPage />,
      },


      {
        path: "login",
        element: <AuthPage />,
      },
=======
      { path: "/", element: <LandingPage /> },
>>>>>>> 7771a7e (Added dashboard and profile prototype)
      { path: "coach", element: <AICoachPage /> },
<<<<<<< HEAD

=======
      
>>>>>>> e8fa661 (Updated the UI (black))
      { path: "story/:levelId", element: <StoryPage /> },
<<<<<<< HEAD
      { path: "story/play", element: <StoryMode /> },
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
  { path: "path", element: <PathUI /> },
  { path: "event", element: <EventsPage /> }
=======
    ],
  },


  {
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },


  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
<<<<<<< HEAD
>>>>>>> 7771a7e (Added dashboard and profile prototype)
=======
  { path: "path", element: <PathUI /> },
<<<<<<< HEAD
>>>>>>> e8fa661 (Updated the UI (black))
=======
  { path: "event", element: <EventsPage/>}
>>>>>>> e20af91 (Added the Events Page)
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
