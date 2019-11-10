export interface IntersectionObserverEntry {
  boundingClientRect: ClientRect | DOMRect;
  intersectionRatio: number;
  intersectionRect: ClientRect | DOMRect;
  isIntersecting: boolean;
  rootBounds: ClientRect | DOMRect | null;
  target: Element;
  time: number;
}

interface IntersectionObserver {
  disconnect(): void;
  observe(target: Element): void;
  takeRecords(): IntersectionObserverEntry[];
  unobserve(target: Element): void;
}
