import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import './main.css'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
const meta = createMetaManager()

app.use(router).use(meta).mount('#app')
