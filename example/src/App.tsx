import React from "react";
import ReactLazyViewport from "@adibfirman/react-lazy-viewport";

const Test = ReactLazyViewport(() => import("./components/Test"));

function App(): JSX.Element {
  console.log(Test);
  return <div />;
}

export default App;
