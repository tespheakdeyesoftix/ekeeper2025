<template>
  <div class="ion-margin-top">
    <ion-text color="secondary">
      <h2>{{ t("Room Status") }}</h2>
    </ion-text>
    <div class="status-container">
      <div style="display: flex;">
        <div v-for="(s, index) in data" :key="index">
          <ion-card
            :router-link="{
              path: '/room',
              query: {
                room_status: s.room_status.replace(/ /g, '_'),
                ...(s.housekeeping_status_code ? { housekeeping_status_code: s.housekeeping_status_code } : {})
              }
            }"
            style="  
              padding: 2px;
              margin: 0px;
              background-color: #8fa5ee;
              color: white;
              border-radius: 10px;
              margin-right: 10px;
            "
          >
            <ion-card-header style="padding: 5px; margin: 0px">
              <ion-card-title style="text-align: left; color: white">{{ t(s.status) }}</ion-card-title>
            </ion-card-header>
            <ion-card-content style="padding: 5px; margin: 0px">
              <div class="status-inline">
                <h1 :style="{ color: s.color }">{{ s.total }}</h1>
                <div v-html="s.icon"></div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Object,
});
const t = window.t;
</script>

<style scoped>
.status-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
  background-color: #8594dc;
  border-radius: 20px;
}

.status-container::-webkit-scrollbar {
  display: none;
}

.status-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;  
}
</style>
