import React from "react";
import { RouterConfig } from "./config/RouterConfig";
import { Providers } from "./components/providers";

function App() {
  return (
    <Providers>
      <RouterConfig />
    </Providers>
  );
}

export default App;
