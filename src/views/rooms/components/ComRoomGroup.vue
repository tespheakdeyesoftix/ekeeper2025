<template>
  <ion-accordion :value="value" style="padding: 0px; margin: 0px;">
    <ion-item slot="header" color="light">
      <ion-label>{{ title }} - {{ data?.length }} </ion-label>
    </ion-item>
    <div
      class="ion-padding"
      slot="content"
      style="padding: 5px 0px; display: grid; grid-template-columns: repeat(3, 1fr);"
    >
      <ComRoomCard v-for="(d, index) in data" :key="index" :data="d" style="margin: 5px;" />
    </div>
  </ion-accordion>
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,
  value: String,
  data: Object,
});

import ComRoomCard from "@/views/rooms/components/ComRoomCard.vue";
</script>
