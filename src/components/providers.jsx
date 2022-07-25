import React from "react";
import { AuthUserProvider } from "../providers/AuthUser";

export const Providers = (props) => {
  return (
    <>
      <AuthUserProvider>{props.children}</AuthUserProvider>
    </>
  );
};
