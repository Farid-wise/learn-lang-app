import type { Directive, DirectiveBinding } from "vue";

export const vAutofocus: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    el.focus();
  },
  created: (el: HTMLElement, binding: DirectiveBinding) => {
    el.focus();
  },
  
};
