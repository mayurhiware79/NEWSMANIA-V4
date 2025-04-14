import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./create-trip/index.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripid]/index.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AiSummary from "./AiSummary/AiSummary.jsx";
import AboutUs from "./components/custom/Aboutus.jsx";
import Discussion from "./components/custom/Discussion.jsx";
import Login from "./components/custom/Login.jsx";
import Register from "./components/custom/Register.jsx";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./components/layout/RootLayout";

//using react-router-dom for creating diff routes on pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "ai-summary",
        element: <AiSummary />,
      },
      {
        path: "view-trip/:tripid",
        element: <Viewtrip />,
      },
      {
        path: "home",
        element: <App />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "discussions",
        element: <Discussion />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>
);
