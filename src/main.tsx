import React from 'react';
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { router } from './router';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
// import { createRoot } from 'react-dom/client';

// const domNode = document.getElementById('root') as HTMLElement;
// const root = createRoot(domNode);
// root.render(<App />);