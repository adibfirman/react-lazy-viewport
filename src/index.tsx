import React, { useState, Fragment, useEffect } from "react";

import { makeID } from "../utils";
import { IntersectionObserverEntry } from "./intersection-observer.d";

export default function initMyFunc<T>(
  asyncComp: () => Promise<{ default: T }>
): Function {
  const getRandomString = makeID(5);
  const className = `react-lazy-viewport-${getRandomString}`;

  function DefaultDOM(): JSX.Element {
    return <div className={className} style={{ visibility: "hidden" }} />;
  }

  function ReactInitThis(): JSX.Element {
    const [theComponent, setComponent] = useState<T>();
    const configs = { rootMargin: "0% 0% 15% 0%" };
    const observer = new IntersectionObserver(callbackIO, configs);

    function callbackIO(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadComponent(() => {
            observer.unobserve(entry.target);
          });
        }
      });
    }

    function loadComponent(cb: Function) {
      const init = asyncComp();
      init.then(objData => {
        cb();
        setComponent(objData.default);
      });
    }

    useEffect(() => {
      const element = document.querySelector(`.${className}`);

      element && observer.observe(element);
    }, [observer]);

    return <Fragment>{theComponent || <DefaultDOM />}</Fragment>;
  }

  return ReactInitThis;
}
