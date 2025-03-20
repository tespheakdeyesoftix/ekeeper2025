<template>
  <ion-card class="ion-no-margin ion-margin-bottom" style="border-radius: 10px">
    <ion-card-header style="padding-bottom: 0px">
      <ion-card-title>{{ t("Guest Information") }}</ion-card-title>
    </ion-card-header>
    <ion-card-content class="ion-no-padding">
      <ion-list class="ion-no-padding">
        <RouterLink
          v-for="(item, index) in data"
          :key="index"
          :to="`/reservation-detail/${item.guest_name}`"
          style="text-decoration: none"
        >
          <ComRoomDetailCard :data="item" />
        </RouterLink>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ComRoomDetailCard from "@/views/rooms/components/ComRoomDetailCard.vue";
const t = window.t;
const props = defineProps({
  data: Object,
});
</script>
