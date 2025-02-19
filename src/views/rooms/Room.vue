<template>
  <ion-page>
    <AppBar>{{ t("Room") }}</AppBar>
    <ion-content :fullscreen="true">
      <ion-searchbar></ion-searchbar>
      <ComRoomFilter />
      <comRoomGroup />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">

import ComRoomFilter from "@/views/rooms/components/ComRoomFilter.vue";
import comRoomGroup from "@/views/rooms/components/ComRoomGroup.vue";
 const t = window.t;
 const x = window.t("hello")
 const l = window.showLoading("Loging please wait")
 
 
</script>
