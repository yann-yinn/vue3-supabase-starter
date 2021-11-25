import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());

app.use(router);

app.mount("#app");
