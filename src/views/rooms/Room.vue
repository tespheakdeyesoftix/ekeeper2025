<template>
  <ion-page>
    <AppBar>{{ t("Room") }}</AppBar>
    <ion-content :fullscreen="true">
      <ion-searchbar></ion-searchbar>
      <ComRoomFilter />
      <comRoomGroup />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonSearchbar,
} from "@ionic/vue";
import ComRoomFilter from "@/views/rooms/components/ComRoomFilter.vue";
import comRoomGroup from "@/views/rooms/components/ComRoomGroup.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
