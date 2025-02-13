<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Room Occupy - {{ dayjs(currentWorkingDate).format("DD-MM-YYYY") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Loading v-if="loading"/>
      <template v-else>
        <ion-list>
          <ion-item v-for="(d, index) in data" :key="index" lines="none" >
              <ComReservationCard  :data="d" />
      </ion-item>
          </ion-list>
      </template>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/useApp';
import {
  IonPage, IonContent,
  IonHeader, IonToolbar, IonButtons, IonTitle,
  IonBackButton, IonButton, IonText, onIonViewDidEnter, onIonViewDidLeave
} from '@ionic/vue';

import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { postApi } from '@/services/api-service';
import ComReservationCard from '@/views/reservations/components/ComReservationCard.vue';

const { currentWorkingDate,currentProperty } = useApp()

const data = ref()
const loading = ref(true)

async function LoadData(){
  const reponse = await postApi("edoor.mobile_api.frontdesk.get_occupy_list",
  {param:{
    property:currentProperty.value.property_name,
    date:currentWorkingDate.value
  }})
  if (!reponse.error){
    data.value = reponse.data
  }
  loading.value = false;

}

onMounted(async () => {
  
  await LoadData();
})



</script>
