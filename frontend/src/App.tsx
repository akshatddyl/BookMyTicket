import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { EventDiscovery } from "./pages/EventDiscovery"
import { Auth } from "./pages/Auth"
import { EventDetails } from "./pages/EventDetails"
import { AdminDashboard } from "./pages/AdminDashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <EventDiscovery /> },
      { path: "login", element: <Auth type="login" /> },
      { path: "register", element: <Auth type="register" /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
