import './assets/main.css'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"
import router from '@/router/index.js'

import App from './App.vue'
import {createPinia} from "pinia";

const app = createApp(App)

const pinia = createPinia()

const toastOptions = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
}

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
