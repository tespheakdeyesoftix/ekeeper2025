<template>
  <ion-card
    v-longPress="onLongPress"
    button
   @click = "onClick"
  >
    <ion-ripple-effect></ion-ripple-effect>
    <ion-card-header
      color="primary"
      style="padding: 5px"
      :style="{
        padding: '5px',
        backgroundColor:
          data?.room_status === 'Room Block'
            ? '#000000'
            : data?.reservation_status_color || '#eae3e3',
      }"
    >
      <ion-card-title style="text-align: center">
        <h5 style="padding: 0px; margin: 0px">
          {{ data?.room_number }} -
          {{
            groupBy == "room_type" ? data?.floor_alias : data?.room_type_alias
          }}
          {{ data?.selected }}
        </h5>
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
        <h6>
          {{ dayjs(data?.block_start_date).format("DD-MM-YYYY") }} 
        </h6>
        <h6>
          {{ dayjs(data.block_end_date).format("DD-MM-YYYY") }}
        </h6>
        <h5 style="font-weight: bold">Room Block</h5>
      </div>
      <!-- Room Vacant -->
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
        <h5 style="font-weight: bold">Vacant</h5>
      </div>
      <!-- icon -->
      <div
        style="
          border-top: 1px solid gray;
          padding: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        "
      >
        <ion-icon
          v-if="data.is_arrival || data.is_departure"
          :icon="airplane"
          :style="{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            padding: '4.5px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #938f8f',
            backgroundColor: data?.is_arrival ? '#0800ff' : '#3d3d3d',
            transform: data?.is_arrival ? 'rotate(45deg)' : 'rotate(-45deg)',
          }"
        />
        <div
          v-html="data.housekeeping_icon"
          :style="{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: data?.color,
            border: '1px solid #938f8f',
          }"
        />
        <ion-icon
          v-if="data.has_work_order"
          :icon="list"
          :style="{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            padding: '4.5px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #938f8f',
            backgroundColor: '#fc6161',
          }"
        />
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { useRoom } from "@/hooks/useRoom";
import { bed, airplane, list } from "ionicons/icons";
import dayjs from "dayjs";
const props = defineProps({
  data: Object,
});
const { onRoomLongPress, groupBy } = useRoom();

function onLongPress() {
  onRoomLongPress(props.data);
}

function onClick() {
  if(props.data){
    props.data.selected = !props.data?.selected; 
  }
  
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
