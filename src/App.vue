<template>
  <ion-app>
      <component :is="Layout">
    <ion-router-outlet   />
    </component>
    
 
  </ion-app>
</template>

<script setup lang="ts">

import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { IonApp, IonRouterOutlet,IonPage } from '@ionic/vue';

import { useAuth } from './hooks/useAuth';
const {isAuthenticated} = useAuth();
const route = useRoute();
const Layout = computed(() => {
  return route.meta.layout || defineAsyncComponent(() => import('@/views/layouts/MainLayout.vue'));
});

</script>
