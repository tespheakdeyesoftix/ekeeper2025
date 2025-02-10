import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { storageService } from '@/services/storage-service';
import { useAuth } from '@/hooks/useAuth';



import { IonicVue,useIonRouter } from '@ionic/vue';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
 



// attach service to window easy to call it later
window.storageService = storageService;
 
const  {checkUserLogin} = useAuth(router);
const app = createApp(App)
.use(IonicVue)
async function init() {
  
  // check if have current login user then login
 
  await checkUserLogin();
  // set frappe app

 
  app.use(router);
  
  await router.isReady();
  
  app.mount("#app");
}

init();

