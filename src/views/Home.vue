<template>
  <ion-page>
    <AppBar>Home</AppBar>
    <ion-content :fullscreen="true">
      <Loading v-if="loading"/>
        <template v-else>
          <ComWelcome />
     
          <ComSummaryKPI :data="data?.summary" />
          <ComRoomStatus :data="data?.room_status" />

          <ion-button router-link="/room-detail">Open Room Detail</ion-button>
        </template>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useHome } from '@/hooks/useHome';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import ComWelcome from "@/views/home/components/ComWelcome.vue"
import ComSummaryKPI from "@/views/home/components/ComSummaryKPI.vue"
import ComRoomStatus from "@/views/home/components/ComRoomStatus.vue"
import Loading from './components/Loading.vue';
const { loading, data,currentProperty } = useHome()
</script>
