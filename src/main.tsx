// import React from "react";
import ReactDOM from "react-dom/client";
import React from 'react';
// import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Dashboard from "./pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// import { createRoot } from 'react-dom/client';

// const domNode = document.getElementById('root') as HTMLElement;
// const root = createRoot(domNode);
// root.render(<App />);