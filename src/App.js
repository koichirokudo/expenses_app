import React from "react";
import { RouterConfig } from "./config/RouterConfig";
import { Providers } from "./components/Providers";

function App() {
  return (
    <Providers>
      <RouterConfig />
    </Providers>
  );
}

export default App;
