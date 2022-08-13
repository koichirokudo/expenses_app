import React from "react";
import { AuthUserProvider } from "../providers";

export const Providers = (props) => {
  console.log("Providers");
  return (
    <>
      <AuthUserProvider>{props.children}</AuthUserProvider>
    </>
  );
};
