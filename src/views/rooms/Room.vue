<template>
  <ion-page>
    <AppBar>Room</AppBar>
    <ion-content :fullscreen="true">
      <ion-searchbar></ion-searchbar>
      <!-- Filter -->
      <ComRoomFilter />
      <ion-accordion-group :value="['first', 'second', 'third']">
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>First Accordion</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">First Content</div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label>Second Accordion</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">Second Content</div>
        </ion-accordion>

        <ion-accordion value="third">
          <ion-item slot="header" color="light">
            <ion-label>Third Accordion</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">Third Content</div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonSearchbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
import ComRoomFilter from '@/views/rooms/components/ComRoomFilter.vue';
import { defineComponent } from 'vue';
import { searchCircle } from 'ionicons/icons';
</script>
