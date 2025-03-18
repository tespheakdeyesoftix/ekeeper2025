<template>
  <ion-page>
    <ToolBar>{{ t("Room Detail") }} - {{ name }}</ToolBar>
    <ion-content class="ion-padding" :fullscreen="true">
      <ComRoomDetail />
      <ComRoomGuestInformation  :data="Guest_Information" />
      <ComRoomTaskList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import ComRoomDetail from "@/views/rooms/components/ComRoomDetail.vue";
import ComRoomGuestInformation from "@/views/rooms/components/ComRoomGuestInformation.vue";
import ComRoomTaskList from "@/views/rooms/components/ComRoomTaskList.vue";
const t = window.t;
const route = useRoute();
const name = ref(route.params.name);
const Guest_Information = ref([
  {
    guest_name: "Rathana",
    email: "rathana@gmail.com",
    phone_number: "061 383 008",
    reservation_status: "In-house",
    reservation_status_color: "#29CD42",
    adult: 2,
    child: 1,
    arrival_date: "2025-03-10 15:29:39.220776",
    departure_date: "2025-03-12 15:29:39.220776",
  },
  {
    guest_name: "Heng",
    email: "heng@gmail.com",
    reservation_status: "Reserved",
    reservation_status_color: "#ff7300",
    adult: 1,
    child: 0,
    arrival_date: "2025-03-10 9:29:39.220776",
    departure_date: "2025-03-12 15:29:39.220776",
  }
])
</script>
  