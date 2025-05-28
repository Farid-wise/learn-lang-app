import "./assets/main.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
//import 'primevue/resources/themes/aura-light-blue/theme.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastServie from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import { initFireBaseApp } from "./service/firebase.config";
import AnimateOnScroll from "primevue/animateonscroll";
import Tooltip from "primevue/tooltip";
import { vAutofocus } from "./directives/v-autofocus";
import DialogService from "primevue/dialogservice";
import { checkAppAuth } from "./plugins/auth.global";
import { initBasePresets } from "./plugins/init-base-presets";

export const fireBaseInst = initFireBaseApp();
const app = createApp(App);

app.use(router);

app.use(ToastServie).use(DialogService).use(ConfirmationService).use(PrimeVue, {
  ripple: true,
});

app.use(createPinia()).use(checkAppAuth()).use(initBasePresets());

app.directive("animateonscroll", AnimateOnScroll);
app.directive("tooltip", Tooltip);
app.directive("autofocus", vAutofocus);

app.mount("#app");
