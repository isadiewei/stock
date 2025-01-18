import { isAdmin } from "../../services/isAdmin";
import { RouteGuard } from "./RouteGuard.component";
import { RedirectRouteGuardProps } from "./RouteGuard.model";

export const RedirectRouteGuard = (props: RedirectRouteGuardProps) => {
  return (
    <RouteGuard check={isAdmin} redirectTo='/dashboard' element={props.element}></RouteGuard>
  );
}