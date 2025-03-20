<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Reservation Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-chip color="medium">STAY#: ST2025-92383</ion-chip>
      <ion-chip color="success">In-House</ion-chip>
      <ion-segment>
        <ion-segment-button value="general" content-id="general">
          <ion-label>General</ion-label>
        </ion-segment-button>
        <ion-segment-button value="roomstay" content-id="roomstay">
          <ion-label>Room Stay</ion-label>
        </ion-segment-button>
        <ion-segment-button value="folio" content-id="folio">
          <ion-label>Folio</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-segment-view>
        <ion-segment-content id="general"><ReservationDetailGeneral/></ion-segment-content>
        <ion-segment-content id="roomstay"><ReservationDetailRoomStay/></ion-segment-content>
        <ion-segment-content id="folio"><ReservationDetailFolio/></ion-segment-content>
      </ion-segment-view>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ReservationDetailGeneral from "@/views/reservations/components/ReservationDetailGeneral.vue"
import ReservationDetailRoomStay from "@/views/reservations/components/ReservationDetailRoomStay.vue"
import ReservationDetailFolio from "@/views/reservations/components/ReservationDetailFolio.vue"
</script>
