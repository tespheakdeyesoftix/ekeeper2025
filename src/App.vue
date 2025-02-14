<template>
  <ion-app>
    <DrawerMenu v-if="isAuthenticated" />
  <ion-content id="main-content">
    <ion-tabs>
<ion-router-outlet />
<Tabs v-if="!route.meta.hideTab"/>
</ion-tabs>
    
  </ion-content>

  </ion-app>
</template>

<script setup lang="ts">
  import {watch,ref} from "vue"
  import { useRoute } from 'vue-router';
import { IonApp, IonRouterOutlet,IonTabs,IonPage,IonContent,IonButtons, IonTitle, IonMenuButton } from '@ionic/vue';
   
import DrawerMenu from "@/views/layouts/DrawerMenu.vue"  
import Tabs from "@/views/layouts/Tabs.vue"  
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

  import { useAuth } from '@/hooks/useAuth';
  const {isAuthenticated} = useAuth();
  const route = useRoute();
  const title = ref(route.meta.title || 'eKeeper');
  const hideTab = ref(false);
 
  // Watch for route changes and update the title
  watch(() => route.meta.title, (newTitle) => {
    title.value = newTitle || 'eKeeper';
   
  });

 

</script>
