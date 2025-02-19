<template>
    <div style="padding: 0 5px">
        <ion-text color="secondary">
    <h2>{{ t("Summary") }}</h2>
  </ion-text>
  <ion-grid>
    <ion-row>
      <ion-col size="4">
        
        <ComKPI url="/occupy"  label="Occupy">{{ data?.total_room_occupy }}</ComKPI>
      </ion-col>
      <ion-col size="4">
        <ComKPI label="Vacant Room" url="/room">{{ data?.total_room_vacant }}</ComKPI>
      </ion-col>
      <ion-col size="4">
        <ComKPI url="/room" label="Total Rooms">{{ data?.total_room }}</ComKPI>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="4">
      
        <ComKPI label="Arrival">{{ data?.arrival }}</ComKPI>
 
      </ion-col>
      <ion-col size="4">
        <ComKPI label="Stay Over">{{ data?.stay_over }}</ComKPI>
      </ion-col>
      <ion-col size="4">
        <ComKPI label="Departure">{{ data?.departure }}</ComKPI>
      </ion-col>
    </ion-row>
  </ion-grid>
 
    </div>
    
</template>
<script lang="ts" setup>
  import {  IonText,IonGrid,IonRow,IonCol,useIonRouter } from '@ionic/vue';
  import ComKPI from "@/views/components/ComKPI.vue"
const props = defineProps({
    data:Object
})
import { useI18n } from 'vue-i18n';
const { t  } = useI18n();

</script>