<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ t('Room Occupy') }} - {{ t(dateList.find(r=>r.id=== currentView).label) }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
      <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
 
      <ion-segment  :scrollable="true" v-model="currentView">
        
        <ion-segment-button v-for="(d, index) in dateList" :key="'sb_' + index"  :value="d.id" :content-id="d.id">
          <ion-label>{{ t(d.label) }}</ion-label>
        </ion-segment-button>
        
      </ion-segment>

      <ion-segment-view>
        <ion-segment-content v-for="(d, index) in dateList" :key="'sc_' + index" :id="d.id">
          
          <ComRoomOccupyList ref="occupancyListRef" :date="d.date" v-if="d.is_loaded" />

        </ion-segment-content>
        
      </ion-segment-view>


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
import Loading from '../components/Loading.vue';
const t = window.t;
const occupancyListRef = <any[]>[];

const { currentUser } = useAuth()
const { currentWorkingDate, currentProperty } = useApp()

dayjs.extend(utc);
const tomorrow = ref(dayjs.utc(currentWorkingDate.value).add(1, "day").format("YYYY-MM-DD"));
const currentView = ref("today")

watch(currentView, (newVal, oldVal) => {
  if(newVal!=oldVal){
    dateList.value.find((r:any)=>r.id == newVal).is_loaded = true;
  }
});

const dateList = ref<any[]>([
  { date: currentWorkingDate.value, id: "today", label: "Today", is_loaded: true },
  { date: tomorrow, id: "tomorrow", label: "Tomorrow", is_loaded: false }
]);


[2,3,4,5].forEach(n => {
  const date = dayjs.utc(currentWorkingDate.value).add(n, "day");
  dateList.value.push(
    
    { date: date.format("YYYY-MM-DD"), id: date.format("dddd_MM_YYYY"), label: date.format("DD") + " " + t(date.format("MMM")), is_loaded: false },

  )
});


const onRefresh = async (event: CustomEvent) => {
  const index =  dateList.value.findIndex(item => item.id === currentView.value);
  
 occupancyListRef[index].LoadData();

 event.target.complete();
};


</script>