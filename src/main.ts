import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './icons'

const app = createApp(App)

app.use(createPinia())

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
