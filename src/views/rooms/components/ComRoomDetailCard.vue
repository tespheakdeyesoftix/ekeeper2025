<template>
  <ion-card
    class="ion-no-border"
  >
    <div style="display: flex; align-items: center" class="ion-padding-start">
      <div>
      <template v-if="data?.photo">
        <ion-avatar style="width: 60px; height: 60px;">
          <Img :src="data.photo"  />
        </ion-avatar>
      </template>
      <template v-else>
        <ion-avatar class="avatar-placeholder" :style="{ backgroundColor: getRandomColor() }">{{ getAvatarLetter(data?.guest_name) }}</ion-avatar>
      </template>
    </div> 
      <div style="width: 100%; padding: 5px">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <ion-text color="dark">
            <h6 style="font-weight: bold" class="truncate" >
              {{ data?.guest_name }}
            </h6>
          </ion-text>
          <div style="display: flex; align-items: center">
            <h6
              :style="{
                borderRadius: '10px',
                padding: '3px 5px',
                backgroundColor: data?.reservation_status_color,
                color: 'var(--ion-color-light)',
              }"
            >
              {{ data?.reservation_status }}
            </h6>
            <ion-button fill="clear" class="ion-no-margin ion-no-padding">
              <ion-icon :icon="ellipsisVertical"></ion-icon>
            </ion-button>
          </div>
        </div>
        <h6>{{ data?.phone_number }}</h6>
        <h6>{{ data?.email }}</h6>
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        padding: 5px;
        border-top: 0.5px solid rgba(0, 0, 0, 0.1);
      "
    >
      <ion-icon
        :icon="airplane"
        style="margin: 0px 0px 2px 0px; transform: rotate(45deg)"
      ></ion-icon>
      <h6>{{ t(dayjs(data?.arrival_date).format("DD MMM hh:mm a")) }}</h6>
      <ion-icon
        :icon="airplane"
        style="margin: 0px 0px 2px 3px; transform: rotate(-45deg)"
      ></ion-icon>
      <h6>{{ t(dayjs(data?.departure_date).format("DD MMM hh:mm a"))  }}</h6>
      <ion-icon :icon="bed" style="margin: 0px 0px 2px 3px"></ion-icon>
      <h6>{{ data?.adult }}/{{ data?.child }}</h6>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { bed, airplane, ellipsisVertical } from "ionicons/icons";
import { getAvatarLetter,getRandomColor } from '@/helpers/utils';
import dayjs from "dayjs";
const t = window.t;
const props = defineProps({
  data: Object,
});
</script>
<style scoped>
.truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.avatar-placeholder {
  width: 60px;
  height: 60px;
  color: white;
  text-align: center;
  align-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
