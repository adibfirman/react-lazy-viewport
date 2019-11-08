import React from "react";
import ReactLazyViewport from "@adibfirman/react-lazy-viewport";

const Test = ReactLazyViewport(() => import("./components/Test"));

function App(): JSX.Element {
  return <Test />;
}

export default App;
