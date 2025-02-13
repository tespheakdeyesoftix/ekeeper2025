<template>
  <ion-page>
    <AppBar>Home</AppBar>
    <ion-content :fullscreen="true">
     <ComWelcome/>
     <ComSummaryKPI :data="data?.summary"/>
     <ion-button router-link="/room-detail">Open Room Detail</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useHome } from '@/hooks/useHome';
import { IonPage,  IonContent,IonButton  } from '@ionic/vue';
import ComWelcome from "@/views/home/components/ComWelcome.vue"
import ComSummaryKPI from "@/views/home/components/ComSummaryKPI.vue"
const {loading,data} = useHome()

 
</script>
