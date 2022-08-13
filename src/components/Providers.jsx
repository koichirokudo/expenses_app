import React from "react";
import { AuthUserProvider } from "../providers";

export const Providers = (props) => {
  return (
    <>
      <AuthUserProvider>{props.children}</AuthUserProvider>
    </>
  );
};
