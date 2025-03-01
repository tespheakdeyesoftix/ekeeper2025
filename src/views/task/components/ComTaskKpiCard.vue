<template>
  <ion-card :color="color" button class="kpi-card ion-no-margin"> 
    <div class="number-top-left">
      <slot></slot>
    </div>
 
    <ion-icon :icon="icon" class="status-icon"></ion-icon>
  
    <h3 class="bottom-left">{{ t(label) }}</h3>
  </ion-card>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  icon: Object,
  color: String
});
const t = window.t;
</script>

<style scoped>
.kpi-card {
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--ion-box-shadow);  
  height: 100px;
}

.number-top-left {
  font-size: 2rem;
  font-weight: bold;
  color: var(--ion-color-light);
  position:absolute;
  top:10px;
  left:10px 
}

.status-icon {
  font-size: 2rem;
  color: var(--ion-color-light);
  position: absolute;
  top: 10px;
  right: 10px;
}

.bottom-left {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--ion-color-light);
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.kpi-card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
  cursor:pointer
}

.kpi-card:active {
  transform: translateY(2px);
  box-shadow: var(--ion-box-shadow);
}
</style>
