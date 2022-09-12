import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import Axios from 'axios'

const app = createApp(App)
const base = Axios.create({
    baseURL: "http://localhost:3000/"
});

app.config.globalProperties.$http=base;
app.use(router)
app.mount('#app')
