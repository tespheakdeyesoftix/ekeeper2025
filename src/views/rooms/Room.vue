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
        <ComRoomFilter :roomStatus="roomStatus" :housekeepingStatusCode="housekeepingStatusCode" />
        <ion-button @click="Test">Get Selected</ion-button>
 
        <ComRoom :data="data"   />
      </template>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { onIonViewDidEnter } from "@ionic/vue"
import ComRoomFilter from "@/views/rooms/components/ComRoomFilter.vue";
import ComSearchBar from "@/views/components/ComSearchBar.vue";
import { useRoom } from "@/hooks/useRoom";
import ComRoom from "@/views/rooms/components/ComRoom.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const t = window.t;
const roomStatus = ref(route.query.room_status ? route.query.room_status.replace("_", " ") : '')
const housekeepingStatusCode = ref(route.query.housekeeping_status_code);
const initialRoomStatus = ref(roomStatus.value);
const initialHousekeepingStatusCode = ref(housekeepingStatusCode.value);
const {
  loading,
  onSearch,
  getData,
  onRefresh,
  data
} = useRoom();

function Test(){
  alert(JSON.stringify(data?.value.filter((r:any)=>r.selected).map((x:any)=>x.name)))
}

// Watch route query changes and update roomStatus and housekeepingStatusCode only if they actually change
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    const newRoomStatus = newQuery.room_status ? newQuery.room_status.replace("_", " ") : '';
    const newHousekeepingStatusCode = newQuery.housekeeping_status_code;

    if (newRoomStatus !== roomStatus.value || newHousekeepingStatusCode !== housekeepingStatusCode.value) {
      roomStatus.value = newRoomStatus;
      housekeepingStatusCode.value = newHousekeepingStatusCode;
      getData(); // Fetch new data based on updated query params
      console.log("getData");
      
    }
  },
  { immediate: true }
);

// Fetch data on component mounted
onMounted(async () => {
  await getData();
  console.log("OnMounted");
});

// Fetch data when the view is entered, but only if roomStatus or housekeepingStatusCode have changed
onIonViewDidEnter(async () => {
  const newRoomStatus = roomStatus.value;
  const newHousekeepingStatusCode = housekeepingStatusCode.value;

  // Only re-fetch data if roomStatus or housekeepingStatusCode have changed
  if (
    newRoomStatus !== initialRoomStatus.value ||
    newHousekeepingStatusCode !== initialHousekeepingStatusCode.value
  ) {
    await getData();
    initialRoomStatus.value = newRoomStatus;
    initialHousekeepingStatusCode.value = newHousekeepingStatusCode;
    console.log("OnIonViewDidEnter");
  }
});
</script>
