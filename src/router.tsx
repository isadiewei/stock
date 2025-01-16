import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { EditCatch } from './pages/EditCatch';
import { ErrorPage } from './pages/ErrorPage';
import { AddCatch } from './pages/AddCatch';
import { AddFish } from './pages/AddFish';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/EditCatch/:id",
    element: <EditCatch />
  },
  {
    path: "/AddCatch",
    element: <AddCatch />
  },
  {
    path: "/AddFish",
    element: <AddFish />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);
