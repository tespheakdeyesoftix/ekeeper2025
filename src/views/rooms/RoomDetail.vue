<template>
  <ion-page>
    <ToolBar>{{ t("Room Detail") }} - {{ name }}</ToolBar>
    <ion-content class="ion-padding" :fullscreen="true">
      <h2 class="ion-no-margin">{{ t("Room Detail") }}</h2>
      <ComRoomDetail />
      <ComRoomDetailCard />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import ComRoomDetail from "@/views/rooms/components/ComRoomDetail.vue";
import ComRoomDetailCard from "@/views/rooms/components/ComRoomDetailCard.vue";
const t = window.t;
const route = useRoute();
const name = ref(route.params.name);
</script>
