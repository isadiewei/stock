import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { Dashboard } from './pages/Catch/CatchDashboard';
import { EditCatch } from './pages/Catch/EditCatch/EditCatch.component';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.component';
import { AddFish } from './pages/Fish/AddFish/AddFish.component';
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
    element: <RedirectRouteGuard element={<EditCatch createNew={false}></EditCatch>}></RedirectRouteGuard>
  },
  {
    path: "/AddCatch",
    element: <RedirectRouteGuard element={<EditCatch createNew={true}></EditCatch>}></RedirectRouteGuard>
  },
  {
    path: "/AddFish",
    element: <RedirectRouteGuard element={<AddFish createNew={true}/>}></RedirectRouteGuard>
  },
  {
    path: "/EditFish/:id",
    element: <RedirectRouteGuard element={<AddFish createNew={false}/>}></RedirectRouteGuard>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);
