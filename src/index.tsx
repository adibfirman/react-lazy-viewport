import React, { useState, Fragment, useEffect } from "react";
import { makeID } from "../utils";

export default function initMyFunc<T>(
  asyncComp: () => Promise<{ default: T }>
): Function {
  const getRandomString = makeID(5);
  const className = `${getRandomString}_react-lazy-viewport_${getRandomString}`;

  function DefaultDOM(): JSX.Element {
    return <div className={className} style={{ visibility: "hidden" }} />;
  }

  function ReactInitThis(): JSX.Element {
    const [theComponent, setComponent] = useState<T>();

    useEffect(() => {
      const configs = { rootMargin: "0% 0% 10% 0%" };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            asyncComp().then(objData => setComponent(objData.default));
          }
        });
      }, configs);

      const element = document.querySelector(`.${className}`);
      element && observer.observe(element);
    }, []);

    return <Fragment>{theComponent || <DefaultDOM />}</Fragment>;
  }

  return ReactInitThis;
}
