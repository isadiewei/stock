import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { Dashboard } from './pages/Dashboard/Dashboard.component';
import { EditCatch } from './pages/Catch/EditCatch/EditCatch.component';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.component';
import { AddFish } from './pages/Fish/AddFish/AddFish.component';
import { RedirectRouteGuard } from './components/RouteGuard/RedirectRouteGuard.component';

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
    element: <RedirectRouteGuard element={<EditCatch createNew={false}></EditCatch>}></RedirectRouteGuard>
  },
  {
    path: "/AddCatch",
    element: <RedirectRouteGuard element={<EditCatch createNew={true}></EditCatch>}></RedirectRouteGuard>
  },
  {
    path: "/AddFish",
    element: <RedirectRouteGuard element={<AddFish />}></RedirectRouteGuard>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);
