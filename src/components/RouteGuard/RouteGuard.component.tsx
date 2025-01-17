import { ReactElement, useEffect, useState } from "react";
import { RouteGuardProps } from "./RouteGuard.model";
import { useNavigate } from "react-router-dom";

export const RouteGuard = (props: RouteGuardProps): ReactElement<any, any> => {
  const navigate = useNavigate();
  const [reactElement, setReactElement] = useState<ReactElement<any, any>>(<></>);

  useEffect(() => {
    props.check().then(result => {
      if (result) {
        setReactElement(props.element);
      } else {
        navigate(props.redirectTo);
      }
    })

  }, [])

  return (
    <>
      {reactElement}
    </>
  );
}