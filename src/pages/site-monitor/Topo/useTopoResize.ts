export function getTopoOffset(domRef: SVGElement | null, extraHeight = 78) {
  let offsetToTopForDom = 0;
  if (domRef) {
    offsetToTopForDom = domRef.getBoundingClientRect().bottom;
  }
  return `calc(100vh - ${offsetToTopForDom + extraHeight}px)`;
}
