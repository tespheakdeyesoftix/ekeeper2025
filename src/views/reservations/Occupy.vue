<template>
  <ion-page>
    <ToolBar>{{ t('Room Occupy') }} </ToolBar>

    <ion-content :fullscreen="true">
      
      <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
 <ComRoomOccupyList ref="occupancyRef" :date="currentWorkingDate"  />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/useApp';


import dayjs from 'dayjs';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from '@/hooks/useAuth';
import ComRoomOccupyList from '@/views/reservations/components/ComRoomOccupyList.vue';

import utc from 'dayjs/plugin/utc';
 
const t = window.t;
const occupancyRef =ref()


const { currentWorkingDate } = useApp()

dayjs.extend(utc);



const onRefresh = async (event: CustomEvent) => {
 
  occupancyRef.LoadData();

 event.target.complete();
};


</script>