<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

       
      <ion-button expand="full" @click="onCheckMe">Check Server Property Inrormat</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonButton  } from '@ionic/vue';

import {getPropertyInformation} from "@/services/auth-service"
const onCheckMe = async ()=>{
   const {data,error} =await getPropertyInformation("SR2021-0001")

   console.log(data)
}
</script>
