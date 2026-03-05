import { createBrowserRouter } from "react-router-dom"
import Landing from "../pages/Landing"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import EventList from "../pages/Events/EventList"
import EventDetails from "../pages/Events/EventDetails"
import Dashboard from "../pages/Dashboard/Dashboard"
import CalendarView from "../pages/Calendar/CalendarView"
import ProtectedRoute from "../components/layout/ProtectedRoute"
import MainLayout from "../components/layout/MainLayout"

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <MainLayout><Login /></MainLayout> },
  { path: "/register", element: <MainLayout><Register /></MainLayout> },
  { path: "/events", element: <MainLayout><EventList /></MainLayout> },
  { path: "/events/:id", element: <MainLayout><EventDetails /></MainLayout> },

  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </MainLayout>
    ),
  },

  {
    path: "/calendar",
    element: (
      <MainLayout>
        <ProtectedRoute>
          <CalendarView />
        </ProtectedRoute>
      </MainLayout>
    ),
  },
])