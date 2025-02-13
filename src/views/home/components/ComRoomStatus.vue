<template>
    <div class="status-container">
      <div class="status-list">
        <div v-for="(s, index) in data" :key="index" class="status-card" >
          <div class="status-icon" v-html="s.icon"></div>
          <h1 :style="{ color: s.color }">{{ s.total }}</h1>
          <div class="status-info">
            <span class="status-value">{{ s.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup lang="ts">
    const props = defineProps({
        data:Object
    })
</script>
 
<style scoped>
.status-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
}
.status-list {
  display: flex;
  gap: 10px;
}
.status-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  border-radius: 10px;
  min-width: 140px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: rgba(143, 165, 238, 0.822);
}
.status-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
}
.status-info {
  font-size: 14px;
}
.status-value {
  font-size: 16px;
}
</style>