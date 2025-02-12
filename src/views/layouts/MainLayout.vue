<template>

    
    <DrawerMenu v-if="isAuthenticated"/>
    <ion-page id="main-content">
        <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
          <ion-title>{{ title }}</ion-title>
       
            <ComUserProfile/>
         
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <slot></slot>
    </ion-content>

</ion-page>

  </template>
  
  <script setup lang="ts">
  import {watch,ref} from "vue"
  import { useRoute } from 'vue-router';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonButton } from '@ionic/vue';
  import DrawerMenu from "@/views/layouts/DrawerMenu.vue"  
  import ComUserProfile from "@/views/layouts/ComUserProfile.vue"  

  import { useAuth } from '@/hooks/useAuth';
  const {isAuthenticated} = useAuth();
  const route = useRoute();
  const title = ref(route.meta.title || 'eKeeper');

  // Watch for route changes and update the title
  watch(() => route.meta.title, (newTitle) => {
    title.value = newTitle || 'eKeeper';
  });


  </script>
  