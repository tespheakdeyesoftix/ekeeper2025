<script setup>
import { ref } from 'vue';
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { close, pin } from 'ionicons/icons';

// Reactive list of chips
const chips = ref([
  { id: 1, label: 'Task', showClose: false },
  { id: 2, label: 'My Task', showClose: false }
]);

// Function to show the close icon only on the clicked chip
const toggleCloseIcon = (id) => {
  chips.value = chips.value.map(chip => ({
    ...chip,
    showClose: chip.id === id ? !chip.showClose : false // Hide others
  }));
};
</script>

<template>
        <ion-text color="secondary">
        <h2>{{ t("Summary") }}</h2>
        </ion-text>
  <div class="chip-container">
    <ion-chip 
      v-for="chip in chips" 
      :key="chip.id" 
      class="custom-chip"
      @click="toggleCloseIcon(chip.id)"
    > 
      <ion-icon 
        v-if="chip.showClose" 
        :icon="pin" 
        class="chip-icon"
      />
      <ion-label class="chip-label">{{ chip.label }}</ion-label>
    </ion-chip>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 10px;
}

.chip-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.custom-chip {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 25px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1); 
  cursor: pointer;
}

.custom-chip:hover {
  background: #bbdefb;
  transform: scale(1.05);
}

.chip-label {
  font-size: 1rem;
  font-weight: 500;
}

.chip-icon {
  margin-right: 8px;
  font-size: 1.2rem;
  color: #ff4081;
}
</style>
