export class BrowserStyles {
  getComputedStyle(element: HTMLElement, property: string): string {
    return window.getComputedStyle(element)[property];
  }
  readStyle(element: HTMLElement, property: string): string {
    return element.style[property] || null;
  }
}
