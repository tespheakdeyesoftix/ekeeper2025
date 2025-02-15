<script setup lang="ts">
import { ref } from 'vue';
import { IonChip, IonIcon, IonLabel, IonText } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { list, today } from 'ionicons/icons';

const { t } = useI18n();

const props = defineProps({
    allTasks: Array,
    myTasks: Array
});

const chips = ref([
  { id: 1, label: 'My Task', icon: list, value: 'myTask' },
  { id: 2, label: 'All Task', icon: today, value: 'allTask' }
]);

const selectedTab = ref('my');

const setSelectedTab = (tab: string) => {
  selectedTab.value = tab;
};
</script>

<template>
  <ion-text color="secondary">
    <h2 class="title">{{ t("Recent List") }}</h2>
  </ion-text>

  <!-- Filter Chips -->
  <div class="chip-container">
    <ion-chip
      v-for="chip in chips"
      :key="chip.id"
      class="custom-chip"
      :class="{ active: selectedTab === chip.value }"
      @click="setSelectedTab(chip.value)"
    >
      <ion-icon :icon="chip.icon" :class="{ 'active-icon': selectedTab === chip.value }"
      />
      <ion-label>{{ chip.label }}</ion-label>
    </ion-chip>
  </div>

  <!-- My Tasks List -->
  <div v-if="selectedTab === 'myTask'">
    <div v-if="myTasks?.length" class="task-list">
      <div v-for="(task, index) in myTasks" :key="index" class="task-card">
        <img :src="task.photo" alt="task photo" class="task-photo" />
        <div class="task-details">
          <p class="task-title">{{ task.work_order_type }}</p>
          <p class="task-description">{{ task.description }}</p>
        </div>
      </div>
    </div>
    <p v-else class="no-task-message">No tasks available</p>
  </div>

  <!-- All Tasks List -->
  <div v-if="selectedTab === 'allTask'">
    <div v-if="allTasks?.length" class="task-list">
      <div v-for="(task, index) in allTasks" :key="index" class="task-card">
        <img :src="task.photo" alt="task photo" class="task-photo" />
        <div class="task-details">
          <p class="task-title">{{ task.work_order_type }}</p>
          <p class="task-description">{{ task.description }}</p>
        </div>
      </div>
    </div>
    <p v-else class="no-task-message">No tasks available</p>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1e1e1e;
  margin-bottom: 10px;
}

.chip-container {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.custom-chip {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  background: #f8f9fd;
  border-radius: 20px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  cursor: pointer;
}

.custom-chip.active {
  background: #8594DC;
  color: white;
}
.active-icon{
    color: white;
}
  

.chip-icon {
  margin-right: 6px;
  font-size: 1rem;
  color: #6366f1;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  gap: 12px;
  align-items: center;
}
 
.task-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
  background-color: aqua;
}

.task-title {
  font-weight: bold;
  color: #333;
}

.task-description {
  font-size: 0.9rem;
  color: #777;
}

.no-task-message {
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-top: 10px;
}
</style>
