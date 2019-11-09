import React, { useEffect, Fragment } from "react";

export default function initMyFunc<T>(
  asyncComp: () => Promise<{ default: T }>
): Function {
  function ReactInitThis(): JSX.Element {
    const [theComponent, setComponent] = React.useState<T>();
    const [abc, setAbc] = React.useState(123);

    useEffect(() => {
      console.log(abc);
    }, []);

    useEffect(() => {
      console.log(abc);
      setTimeout(() => {
        asyncComp().then(objectData => {
          setComponent(objectData.default);
        });
      }, 3000);
    }, []);

    return <Fragment>{theComponent}</Fragment>;
  }

  return ReactInitThis;
}
