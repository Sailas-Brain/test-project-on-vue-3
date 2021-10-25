import { createApp } from 'vue'
import App from './App.vue'
import componenst from '@/componenst/UI'
import router from '@/router/router';
import directives from '@/directives'

const app = createApp(App)


componenst.forEach(component => {
  app.component(component.name, component)
});

directives.forEach(directive => {
  app.directive(directive.name, directive)
});


app
  .use(router)
  .mount('#app')
