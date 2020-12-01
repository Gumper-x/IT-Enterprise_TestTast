import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

// Scroll
export function disableScroll(): void {
  disableBodyScroll(document.body, { reserveScrollBarGap: true });
}
export function enableScroll(): void {
  enableBodyScroll(document.body);
}
