import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { storageService } from '@/services/storage-service';
import { useAuth } from '@/hooks/useAuth';



import {IonLabel, IonChip, IonPage,IonContent, IonicVue,useIonRouter,IonRippleEffect,IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonCardSubtitle, IonIcon } from '@ionic/vue';

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
import AppBar from '@/views/layouts/AppBar.vue';
import Loading from '@/views/components/Loading.vue';
import i18n from '../i18n'; // Import i18n config


// attach service to window easy to call it later
window.storageService = storageService;
window.t = i18n.global.t;
const  {checkUserLogin} = useAuth(router);
const app = createApp(App)
.use(IonicVue)

async function init() {
  
  // check if have current login user then login
 
  await checkUserLogin();
  
  // set frappe app

 
  app.use(router);
  app.use(i18n);
  app.component('AppBar', AppBar)
  app.component('Loading', Loading)
  app.component('ion-ripple-effect', IonRippleEffect)
  app.component('ion-card', IonCard)
  app.component('ion-card-title', IonCardTitle)
  app.component('ion-card-content', IonCardContent)
  app.component('ion-card-header', IonCardHeader)
  app.component('ion-card-subtitle', IonCardSubtitle)
  app.component('ion-page', IonPage)
  app.component('ion-content', IonContent)
  app.component('ion-content', IonContent)
  app.component('ion-icon',IonIcon)
  app.component('ion-chip',IonChip)
  app.component('ion-label',IonLabel)

  await router.isReady();
  
  app.mount("#app");
}

init();

