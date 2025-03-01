<template>
  <ion-card :color="color" button>

    <div class="number-top-left">
      <slot></slot>
    </div>

    <ion-icon :icon="icon" class="status-icon icon-top-right"></ion-icon>

    <h3 class="bottom-left">{{ t(label) }}</h3>

  </ion-card>
</template>
<script setup lang="js">
const props = defineProps({
  label: String,
  icon: Object,
  color: String
})
const t = window.t;
</script>
