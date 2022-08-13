import React from "react";
import { useAuthUserContext } from "../../providers";
import { Navigate } from "react-router-dom";

export const RouteAuthGuard = (props) => {
  console.log("RouteAuthGuard");
  const authUser = useAuthUserContext().user;

  if (authUser) {
    return <>{props.component}</>;
  } else {
    return <Navigate to={props.redirect} replace={false} />;
  }
};
