import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Import the router

createApp(App)
  .use(router) // Tell the app to use the router
  .mount('#app')