import React, { useState, useCallback, Fragment, useEffect } from "react";

import { makeID } from "../utils";

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
    const callbackIO = useCallback(funcCallbackIO, []);
    const observer = React.useRef<IntersectionObserver | null>(null);

    function funcCallbackIO(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadComponent(() => {
            observer.current && observer.current.unobserve(entry.target);
          });
        }
      });
    }

    function loadComponent(cb?: Function) {
      const init = asyncComp();
      init.then(objData => {
        cb && cb();
        setComponent(objData.default);
      });
    }

    useEffect(() => {
      if (!!window.IntersectionObserver) {
        const element = document.querySelector(`.${className}`);
        const configs = { rootMargin: "0% 0% 15% 0%" };
        observer.current = new IntersectionObserver(callbackIO, configs);

        element && observer.current && observer.current.observe(element);
      } else loadComponent();
    }, [callbackIO]);

    return <Fragment>{theComponent || <DefaultDOM />}</Fragment>;
  }

  return ReactInitThis;
}
