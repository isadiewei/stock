import { ReactElement } from "react";

export interface RedirectRouteGuardProps {
  element: ReactElement<any, any>;
}

export interface RouteGuardProps {
  element: ReactElement<any, any>;
  check: () => Promise<boolean>
  redirectTo: string;
}