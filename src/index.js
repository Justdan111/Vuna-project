import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import DashboardPage from "./pages/DashboardPage";
import FormPurposePage from "./pages/FormPurposePage";
import LoginPage from "./pages/LoginPage";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import StudentProjectsPage from "./pages/studentProjectPage";
import { LoaderProvider } from "./context/LoaderContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/nof-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormPurposePage />,
  },
  {
    path: "/lecturer",
    element: <LoginPage />,
  },
   {
    path: "/student-project",
    element: <StudentProjectsPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <UserLayout />, 
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "projects", element: <AllProjectsPage /> },
          { path: "projectDetail/:id", element: <ProjectDetailPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <LoaderProvider>
    <Toaster />
    
    <App router={router} />
         </LoaderProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
