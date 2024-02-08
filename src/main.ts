import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './infrastructure/router'
import { VueFire } from 'vuefire'
import { firebaseApp } from './infrastructure/firebase/firebase'

const app = createApp(App)

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: []
})

app.use(createPinia())
app.use(router)

app.mount('#app')
