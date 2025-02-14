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
      <ion-segment>
    <ion-segment-button value="today" content-id="today">
      <ion-label>Today</ion-label>
    </ion-segment-button>
    <ion-segment-button value="tomorrow" content-id="tomorrow">
      <ion-label>Tomorrow</ion-label>
    </ion-segment-button>
 
  </ion-segment>
  <ion-segment-view>
    <ion-segment-content id="today">

      <Loading v-if="loading"/>
      <template v-else>
 
        <ion-list>
          <ion-item v-for="(d, index) in data" :key="index" lines="none" >
              <ComReservationCard  :data="d" />
      </ion-item>
          </ion-list>
      </template>

    </ion-segment-content>
    <ion-segment-content id="tomorrow">
      Tomorrow Data
    </ion-segment-content>
 
  </ion-segment-view>
      
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/useApp';
import {
  IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView,
  IonPage, IonContent,
  IonHeader, IonToolbar, IonButtons, IonTitle,
  IonBackButton, IonButton, IonText, onIonViewDidEnter, 
  IonLabel
} from '@ionic/vue';

import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { postApi } from '@/services/api-service';
import ComReservationCard from '@/views/reservations/components/ComReservationCard.vue';
import { useAuth } from '@/hooks/useAuth';
const {currentUser} = useAuth()
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
 