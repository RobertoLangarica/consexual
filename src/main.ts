import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store, { key } from './store'
import persistent from './cache/persistent'
import firebase from '@/firebase'
import { IonicVue } from '@ionic/vue';
import filesync from '@/filesync'
import { registerComponents } from './components/getComponent';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store, key);

persistent.isReady()
// .then(()=>persistent.clear())
  .then(()=>registerComponents(app))
  .then(()=>filesync.initFolders('avatar','images'))
  .then(()=>firebase.initialize())
  .then(()=>store.dispatch('init'))
  .then(()=>router.isReady())
  .then(()=>{
    app.mount('#app');
  })
