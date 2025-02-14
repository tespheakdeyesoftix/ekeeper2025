<template>
    <ion-card class="reservation-card" @click="onViewReservationDetail">
  <ion-card-header>
    <div class="title-container">
      <ion-card-title>
        <ion-icon :icon="bedOutline" class="icon" /> {{ data?.rooms }} - {{ data?.room_type_alias  }}
      </ion-card-title>
      <ion-card-subtitle>
        <ion-icon :icon="bookmarkOutline" class="icon" size="small" />  {{ data?.name }}
      </ion-card-subtitle>
      <ion-card-subtitle>
        <ion-icon :icon="personCircle" class="icon" size="small" /> {{ data?.guest_name }} 
         / PAX: {{ data?.adult }}/ {{ data?.child }}
      </ion-card-subtitle>
    </div>

    <!-- Status button in top-right corner -->
    <ion-chip :style="{background:data?.status_color,color:'#FFF'}" class="status-btn" >
       {{ data?.reservation_status }}
    </ion-chip>
  </ion-card-header>

  <ion-card-content style="margin-top: -10px;">
      <p><ion-icon :icon="calendar" class="icon" /> Stay: {{ dayjs(data?.arrival_date).format("DD-MM-YYYY") }} to {{ dayjs(data?.departure_date).format("DD-MM-YYYY") }} ({{ data?.room_nights }}N)</p>
      <p><ion-icon :icon="briefcaseOutline" class="icon" /> Source: {{ data?.business_source }}</p>
    
  </ion-card-content>
</ion-card>



  </template>
<script setup lang="ts">
import { useIonRouter,IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonButton, IonIcon } from '@ionic/vue';
import { bookmarkOutline, personCircle, calendar, bedOutline, briefcaseOutline, checkmark, close } from 'ionicons/icons';
import dayjs from 'dayjs';
const ionRouter = useIonRouter();

    const props = defineProps({
        data:Object
    })

    function onViewReservationDetail(){
     
      ionRouter.navigate("reservation-detail/" + props.data?.name, 'forward', 'push');
    }
</script>
<style scoped>
.reservation-card {
  width: 100%;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 10px;
}

.ion-card-header {
  position: relative;
  padding-right: 50px; /* Adjust for button spacing */
}

.status-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  height: 30px;
  padding: 0 10px;
  z-index: 10;
}
</style>
