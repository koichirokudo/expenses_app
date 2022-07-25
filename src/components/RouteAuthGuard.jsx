import React from "react";
import { useAuthUserContext } from "../providers/AuthUser";
import { Navigate } from "react-router-dom";

export const RouteAuthGuard = (props) => {
  const authUser = useAuthUserContext().user;

  if (authUser) {
    return <>{props.component}</>;
  } else {
    return <Navigate to={props.redirect} replace={false} />;
  }
};
