<template>
  <ion-page>
    <AppBar>{{ t("Room") }}</AppBar>
    <ion-content :fullscreen="true" class="ion-pading" >
      <Loading v-if="loading"/>
        <template v-else>
      <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

     <ComSearchBar @onSearch="onSearch"/>
      <ComRoomFilter @onFilter="onFilter" />
<ion-button @click="onChangeGroupBy">Change Group By</ion-button>
     
      <ComRoom :data="data"  />
    </template>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">

import ComRoomFilter from "@/views/rooms/components/ComRoomFilter.vue";

import ComSearchBar from "@/views/components/ComSearchBar.vue";
import { useRoom } from "@/hooks/useRoom"; 
import ComRoom from "@/views/rooms/components/ComRoom.vue";
import { onMounted } from "vue";
const t = window.t;

const {onSearch,onFilter,data,onRefresh,loading,groupBy,getData,onChangeGroupBy } =  useRoom()


onMounted(async ()=>{
  await getData();
})


 
</script>
