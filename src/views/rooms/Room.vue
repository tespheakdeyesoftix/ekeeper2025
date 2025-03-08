<template>
  <ion-page>
    <AppBar>{{ t("Room") }}</AppBar>
    <ion-content :fullscreen="true" class="ion-padding ion-no-margin">
      <Loading v-if="loading" />
      <template v-else>
        <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <ComSearchBar @onSearch="onSearch" />
        <ComRoomFilter :status="{ roomStatus, housekeepingStatusCode }" ref="FilterRef"  />
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
const initialRoomStatus = ref(roomStatus.value || null);
const initialHousekeepingStatusCode = ref(housekeepingStatusCode.value || null);
const { loading, onSearch, getData, onRefresh, data, onFilter, filter } =
  useRoom();
  const FilterRef = ref(null);
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
  if (roomStatus.value || housekeepingStatusCode.value) {
    const filterParams = {
      ...filter.value,
      room_status: roomStatus.value ? [roomStatus.value] : undefined,
      housekeeping_status_code: housekeepingStatusCode.value ? [housekeepingStatusCode.value] : undefined,
    };
  onFilter(filterParams);
  }
});

onIonViewDidEnter(async () => {
  const newRoomStatus = roomStatus.value;
  const newHousekeepingStatusCode = housekeepingStatusCode.value;
  if (
    newRoomStatus !== initialRoomStatus.value ||
    newHousekeepingStatusCode !== initialHousekeepingStatusCode.value
  ) {
    const l = await window.showLoading();
    const date = window.localStorage.getItem("currentWorkingDate");
    initialRoomStatus.value = newRoomStatus;
    initialHousekeepingStatusCode.value = newHousekeepingStatusCode;
    // await FilterRef.value.onClearFilterRoom()
    if (filter.value && filter.value.date !== date) {
      filter.value.date = date;
      await getData();
    }
    if (newRoomStatus || newHousekeepingStatusCode) {
      const filterParams = {
        ...filter.value,
        room_status: roomStatus.value ? [roomStatus.value] : undefined,
        housekeeping_status_code: housekeepingStatusCode.value ? [housekeepingStatusCode.value] : undefined,
        employee: undefined,
        building: undefined,
        floor: undefined,
      };
      onFilter(filterParams,false );
    }
    console.log("OnIonViewDidEnter");
    await l.dismiss();  
  }
});
</script>
