<template>
  <ion-page>
    <AppBar>{{ t("Room") }}</AppBar>
    <ion-content :fullscreen="true" class="ion-pading">
      <Loading v-if="loading" />
      <template v-else>
        <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <ComSearchBar @onSearch="onSearch" />
        <ComRoomFilter :status="{ roomStatus, housekeepingStatusCode }" />
        <ion-button router-link="/room-detail/RM-0001">Get Selected</ion-button>

        <ComRoom :data="data" />
      </template>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { onIonViewDidEnter } from "@ionic/vue";
import ComRoomFilter from "@/views/rooms/components/ComRoomFilter.vue";
import ComSearchBar from "@/views/components/ComSearchBar.vue";
import { useRoom } from "@/hooks/useRoom";
import ComRoom from "@/views/rooms/components/ComRoom.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const t = window.t;
const roomStatus = ref(
  route.query.room_status ? route.query.room_status.replace("_", " ") : ""
);
const housekeepingStatusCode = ref(route.query.housekeeping_status_code);
const initialRoomStatus = ref(roomStatus.value);
const initialHousekeepingStatusCode = ref(housekeepingStatusCode.value);
const { loading, onSearch, getData, onRefresh, data } = useRoom();

watch(
  () => route.query,
  (newQuery) => {
    if (route.fullPath.startsWith("/room")) {
      roomStatus.value = newQuery.room_status
        ? newQuery.room_status.replace("_", " ")
        : null;
      housekeepingStatusCode.value = newQuery.housekeeping_status_code || null;
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await getData();
  console.log("OnMounted");
});

onIonViewDidEnter(async () => {
  const newRoomStatus = roomStatus.value;
  const newHousekeepingStatusCode = housekeepingStatusCode.value;

  if (
    newRoomStatus !== initialRoomStatus.value ||
    newHousekeepingStatusCode !== initialHousekeepingStatusCode.value
  ) {
    // await getData();
    initialRoomStatus.value = newRoomStatus;
    initialHousekeepingStatusCode.value = newHousekeepingStatusCode;
    console.log("OnIonViewDidEnter");
  }
});
</script>
