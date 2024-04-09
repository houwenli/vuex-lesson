import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

let app = createApp(App)

app.provide('message', 'hello')

app.use(store).mount('#app') 