<template>
    <ion-page>
      <AppBar>Home</AppBar>
      <ion-content :fullscreen="true">
        Reservation page
        <Loading v-if="true"/>
          <template v-else>
            Reservation page    
        </template>
  
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
 
  import { IonPage, IonContent, IonButton } from '@ionic/vue';
 
  </script>
  