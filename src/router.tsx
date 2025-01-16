import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { Dashboard } from './pages/Dashboard/Dashboard.component';
import { EditCatch } from './pages/EditCatch';
import { ErrorPage } from './pages/ErrorPage';
import { AddCatch } from './pages/AddCatch/AddCatch.component';
import { AddFish } from './pages/AddFish/AddFish.component';

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
