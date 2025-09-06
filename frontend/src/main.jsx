import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import App from "./App.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Pages
import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import PathUI from "./pages/PathUI.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import AICoachPage from "./pages/AICoachPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import "./index.css";
import StoryMode from "./pages/StoryMode.jsx";

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

      { path: "story/:levelId", element: <StoryPage /> },
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
