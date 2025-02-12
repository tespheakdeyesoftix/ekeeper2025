<template>
  <ion-page>
    <AppBar>Home</AppBar>
    <ion-content :fullscreen="true">
      
      <ExploreContainer name="Tab 1 page" />
      <ion-button router-link="/room">Open Room</ion-button>
      <ion-button router-link="/room-detail">Open Room Detail</ion-button>
       
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonButton  } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import {getPropertyInformation} from "@/services/auth-service"
const onCheckMe = async ()=>{
   const {data,error} =await getPropertyInformation("SR2021-0001")

   console.log(data)
}
</script>
