<template>
  <div style="padding: 0 5px">
    <ion-text color="secondary">
      <h1>{{ t("Room Status") }}</h1>
    </ion-text>
    <div class="status-container">
      <div class="status-list">
        <div v-for="(s, index) in data" :key="index" class="status-card">
         
          <div class="status-value" >{{ t(s.status) }}</div>
          <div class="status-inline">
            <div class="status-total" :style="{ color: s.color }">{{ s.total }}</div>
            <div class="status-icon" v-html="s.icon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Object
});
import { useI18n } from 'vue-i18n';
const { t  } = useI18n();
</script>

<style scoped>
.status-container {
  overflow-x: auto; 
  white-space: nowrap;
  padding: 10px;
  background-color: #8594DC;
  border-radius: 20px;
}

.status-list { 
  display: flex;
  gap: 8px; 
}

.status-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px; 
  border-radius: 12px;
  width: 100%;
  min-height: 40px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  background: #8fa5ee;
  margin: 2px;
}
 
.status-value {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.status-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.status-total {
  font-size: 20px;
  font-weight: bold;
}

.status-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

