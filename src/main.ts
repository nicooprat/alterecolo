import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'windi.css'

const app = createApp(App)

if (import.meta.env.DEV && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
}

app.use(router).mount('#app')
