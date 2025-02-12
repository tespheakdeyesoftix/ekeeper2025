<template>
    
<ion-tabs>
  <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="room" href="/room">
          <ion-icon aria-hidden="true" :icon="bedOutline" />
          <ion-label>Room</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="task" href="/task">
          <ion-icon aria-hidden="true" :icon="clipboardOutline" />
          <ion-label>Task</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Stay" href="/stay">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <ion-label>Stays</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="Report" href="/report">
          <ion-icon aria-hidden="true" :icon="barChartOutline" />
          <ion-label>Report</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
</template>

<script setup lang="ts">
import {watch,ref} from "vue"
import { IonRouterOutlet,IonTabs,IonTabBar, IonTabButton,IonLabel,IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonButton } from '@ionic/vue';
import {
  homeOutline,
  bedOutline,
  clipboardOutline,
  personCircleOutline,
  settingsOutline,
  logOutOutline,
  calendarOutline,
  layersOutline,
  archiveOutline,
  brushOutline,
  barChartOutline
} from 'ionicons/icons';
</script>