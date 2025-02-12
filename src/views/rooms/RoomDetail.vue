<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>Room Detail - 101</ion-title>
    </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        Room Detail
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
import { IonPage, IonContent,  
   IonHeader, IonToolbar, IonButtons, IonTitle,
     IonBackButton,IonButton,IonText } from '@ionic/vue';
  </script>
  