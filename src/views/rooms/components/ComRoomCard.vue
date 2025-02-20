<template>
  <ion-card v-longPress="onLongPress" button>
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
        {{ data?.room_number }} - {{ data?.floor_alias }}
        </ion-card-title>
    </ion-card-header>

    <ion-card-content style="padding: 0px">
      <div style="padding: 5px; height: 80px;" >
        <ion-label  class="truncate" >{{ data?.guest_name }}</ion-label>
        <div style="display: flex; align-items: center">
          <ion-icon :icon="bed"></ion-icon>
          <h6>{{ data?.adult }}/{{ data?.child }}</h6>
        </div>
        <h6>Deposit Guest</h6>
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
import { bed } from "ionicons/icons";
const props = defineProps({
  data: Object,
});

const emit = defineEmits();

function onLongPress() {
  emit("onLongPress", props.data);
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