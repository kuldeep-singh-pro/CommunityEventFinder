import { createBrowserRouter } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import EventList from "../pages/Events/EventList";
import EventDetails from "../pages/Events/EventDetails";
import CreateEvent from "../pages/Events/CreateEvent";
import EditEvent from "../pages/Events/EditEvent";


import Dashboard from "../pages/Dashboard/Dashboard";
import MyEvents from "../pages/Dashboard/MyEvents";

import CalendarView from "../pages/Calendar/CalendarView";
import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import MyActivity from "@/pages/Activity/MyActivity";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import MangeEvent from "@/pages/Events/ManageEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/events",
        element: <EventList />,
      },

      {
        path: "/events/:id",
        element: <EventDetails />,
      },

      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        path: "/calendar",
        element: (
          <ProtectedRoute>
            <CalendarView />
          </ProtectedRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-events",
        element: (
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
        ),
      },

      {
        path: "/create-event",
        element: (
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },

      {
        path: "/edit-event/:id",
        element: (
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        ),
      },

         {
        path: "/manageEvent-event/:id",
        element: (
          <ProtectedRoute>
            <MangeEvent/>
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-activity",
        element: (
          <ProtectedRoute>
            <MyActivity />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className="flex items-center justify-center h-screen text-xl">
        404 Page Not Found
      </div>
    ),
  },
]);
