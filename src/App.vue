<template>
  <ion-app>
    <DrawerMenu v-if="isAuthenticated"/>
    <ion-page id="main-content">
    <ion-router-outlet   />
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">

import { IonApp, IonRouterOutlet,IonPage } from '@ionic/vue';
import DrawerMenu from "@/views/layouts/DrawerMenu.vue"  
import { useAuth } from './hooks/useAuth';
const {isAuthenticated} = useAuth();
</script>
