<template>
  <div>
    <ion-accordion-group :value="['first', 'second', 'third']">
      <ion-accordion value="first">
        <ion-item slot="header" color="light">
          <ion-label>First Accordion</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content" style="padding: 0px; display: grid; grid-template-columns: repeat(3, 1fr);">
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
import ComRoomCard from "@/views/rooms/components/ComRoomCard.vue";
</script>
