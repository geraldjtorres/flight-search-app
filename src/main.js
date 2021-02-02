import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// import Button from 'primevue/button'
// import InputText from 'primevue/inputtext'

import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons

const app = createApp(App)

// Access primevue api and namespace
app.use(PrimeVue)

// app.component('Button', Button)
// app.component('InputText', InputText)

app.use(router).mount('#app')
