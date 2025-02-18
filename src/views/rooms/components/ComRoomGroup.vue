<template>
  <div>
    <ion-accordion-group :value="['first', 'second', 'third']">
      <ion-accordion value="first">
        <ion-item slot="header" color="light">
          <ion-label>First Accordion</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content" style="  display: grid; grid-template-columns: repeat(2, 2fr); gap: 8px; ">
            <ComRoomCard />
            <ComRoomCard />
            <ComRoomCard />
            <ComRoomCard />
        </div>
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
  </div>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import ComRoomCard from "@/views/rooms/components/ComRoomCard.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
function onSelected(data: any) {}

function onClearMe() {}
</script>
