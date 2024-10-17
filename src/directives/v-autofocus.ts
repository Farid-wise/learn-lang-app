import type { DirectiveBinding } from "vue";

export const vAutofocus = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    el.focus();
  },
};
