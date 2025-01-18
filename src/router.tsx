import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { Dashboard } from './pages/Catch/CatchDashboard';
import { EditCatch } from './pages/Catch/EditCatch/EditCatch.component';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.component';
import { EditFish } from './pages/Fish/EditFish/EditFish.component';
import { RedirectRouteGuard } from './components/RouteGuard/RedirectRouteGuard.component';
import { FishDashboard } from './pages/Fish/FishDashboard/Dashboard.component';

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
    path: "/Fishes",
    element: <FishDashboard />
  },
  {
    path: "/EditCatch/:id",
    element: <RedirectRouteGuard element={<EditCatch createNew={false} />}></RedirectRouteGuard>
  },
  {
    path: "/AddCatch",
    element: <RedirectRouteGuard element={<EditCatch createNew={true} />}></RedirectRouteGuard>
  },
  {
    path: "/EditFish/:id",
    element: <RedirectRouteGuard element={<EditFish createNew={false} />}></RedirectRouteGuard>
  },
  {
    path: "/AddFish",
    element: <RedirectRouteGuard element={<EditFish createNew={true} />}></RedirectRouteGuard>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);
