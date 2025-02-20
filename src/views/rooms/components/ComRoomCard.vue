<template>
  <ion-card v-longPress="onLongPress" button :router-link="'/room-detail/' + data?.name">
    <ion-ripple-effect></ion-ripple-effect>
    <ion-card-header
      color="primary"
      style="padding: 5px"
      :style="{
        padding: '5px',
        backgroundColor:
          data?.room_status === 'Room Block'
            ? '#ffffff'
            : data?.reservation_status_color || '#eae3e3',
      }"
    >
      <ion-card-title style="text-align: center">
    
        {{ data?.room_number }} - {{ (groupBy=='room_type'?data?.floor_alias:data?.room_type_alias) }}
      </ion-card-title>
    </ion-card-header>

    <ion-card-content style="padding: 0px">
      <!-- Guest Name -->
      <div v-if="data.guest_name" style="padding: 5px; height: 70px">
        <ion-label class="truncate">{{ data?.guest_name }}</ion-label>
        <div style="display: flex; align-items: center">
          <ion-icon :icon="bed"></ion-icon>
          <h6>{{ data?.adult }}/{{ data?.child }}</h6>
        </div>
        <h6 v-if="data.reservation_color_code">
          {{ data?.reservation_color_code }}
        </h6>
      </div>
      <!-- Room Block -->
      <div
        v-else-if="data.room_status === 'Room Block'"
        style="
          padding: 5px;
          height: 70px;
          display: flex;
          flex-direction: column; 
          justify-content: center;
          align-items: center;
        "
      >
        <h6>{{ data?.block_start_date }} - {{ data.block_end_date }}</h6>
        <h6>
            Room Block</h6>
      </div>
      <!-- Vacant -->
      <div
        v-else-if="data.room_status === 'Vacant'"
        style="
          padding: 5px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <h6>Vacant</h6>
      </div>
      <!-- icon -->
      <div
        style="
          border-top: 1px solid gray;
          padding: 5px;
          display: flex;
          gap: 5px;
        "
      >
        <ion-icon
          :icon="bed"
          style="background-color: red; padding: 5px; border-radius: 100%"
        ></ion-icon>
        <ion-icon
          :icon="bed"
          style="background-color: green; padding: 5px; border-radius: 100%"
        ></ion-icon>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { useRoom } from "@/hooks/useRoom";
import { bed } from "ionicons/icons";
const props = defineProps({
  data: Object,
});
const {onRoomLongPress,groupBy} = useRoom();


 
function onLongPress() {
  onRoomLongPress(props.data);
}
</script>
<style>
.truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
