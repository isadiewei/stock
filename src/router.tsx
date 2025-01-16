import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { Dashboard } from './pages/Dashboard/Dashboard.component';
import { EditCatch } from './pages/Catch/EditCatch/EditCatch.component';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.component';
import { AddFish } from './pages/Fish/AddFish/AddFish.component';

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
    element: <EditCatch createNew={false} />
  },
  {
    path: "/AddCatch",
    element: <EditCatch createNew={true} />
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
