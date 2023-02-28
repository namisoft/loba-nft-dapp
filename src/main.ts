import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

import router from "./router";
import { createClient} from "@/services/massa-client"


import "./assets/main.css";

(async () => {
    const app = createApp(App);

    app.use(ElementPlus);
    app.use(router);

    await createClient();
    
    app.mount("#app");
})()


