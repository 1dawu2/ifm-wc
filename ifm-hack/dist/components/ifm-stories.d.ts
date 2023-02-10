import type { Components, JSX } from "../types/components";

interface IfmStories extends Components.IfmStories, HTMLElement {}
export const IfmStories: {
  prototype: IfmStories;
  new (): IfmStories;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
