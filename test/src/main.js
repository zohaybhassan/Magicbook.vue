import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Make sure the path matches your file structure
import 'bootstrap/dist/css/bootstrap.min.css';


createApp(App).use(router).mount('#app')
