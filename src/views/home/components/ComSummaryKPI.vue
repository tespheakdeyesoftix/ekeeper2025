<template>
    <div style="padding: 0 5px; margin: 0px;">
        <ion-text color="secondary">
          <h2>{{ t("Summary") }}</h2>
        </ion-text>
        
        <ion-grid class="grid-container ion-no-padding">
          <ion-row class="row-container ">
            <ion-col size="4" class="col-container " > 
              <ComKPI class="kpi-container" url="/occupy"  label="Occupy">{{ data?.total_room_occupy }}</ComKPI>
            </ion-col>
            <ion-col size="4" class="col-container">
              <ComKPI class="kpi-container" label="Vacant Room" url="/room?room_status=Vacant">{{ data?.total_room_vacant }}</ComKPI>
            </ion-col>
            <ion-col size="4" class="col-container">
              <ComKPI class="kpi-container" url="/room" label="Total Rooms">{{ data?.total_room }}</ComKPI>
            </ion-col>
          </ion-row>
          <ion-row class="row-container" >
            <ion-col size="4" class="col-container" >  
              <ComKPI class="kpi-container" label="Arrival">{{ data?.arrival }}</ComKPI> 
            </ion-col>
            <ion-col size="4" class="col-container">
              <ComKPI class="kpi-container" label="Stay Over">{{ data?.stay_over }}</ComKPI>
            </ion-col>
            <ion-col size="4" class="col-container">
              <ComKPI class="kpi-container" label="Departure">{{ data?.departure }}</ComKPI>
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

<style scoped> 

/* .row-container{ 
  height: 120px; 
}  */
.kpi-container{
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

</style>