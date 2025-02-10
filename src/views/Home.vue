<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Home</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ion-text>This is home page

            {{ ctrl.data }}

            <ion-button @click="getData">Click me</ion-button>
        </ion-text>
    </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonText,IonButton } from '@ionic/vue';

  import { useHome } from "@/hooks/useHome";
  import {getDocList} from "@/services/api-service"
  const ctrl = useHome()

  
  async function getData(){
    const result =await getDocList("Customer");
    console.log(result)
  }
  


  </script>
  