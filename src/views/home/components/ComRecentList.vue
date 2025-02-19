<script setup lang="ts">
import { ref } from 'vue';
import { IonChip, IonIcon, IonLabel, IonText } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { list, today, briefcaseOutline, locationOutline, documentTextOutline, constructOutline } from 'ionicons/icons';
import { imageUrl } from '@/helpers/utils';
import { getAvatarLetter } from '@/helpers/utils';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const props = defineProps({
  allTasks: Object,
  myTasks: Object
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
<div class="header-container">
  <ion-text color="secondary">
    <h2 class="title">{{ t("Recent List") }}</h2>
  </ion-text>
  <ion-button  @click="() => $router.push('/task')">
    {{ t("View All") }}
  </ion-button>
</div> 

  <!-- Filter Chips -->
  <div class="chip-container">
    <ion-chip
      v-for="chip in chips"
      :key="chip.id"
      class="custom-chip"
      :class="{ active: selectedTab === chip.value }"
      @click="setSelectedTab(chip.value)"
    >
      <ion-icon :icon="chip.icon" :class="{ 'active-icon': selectedTab === chip.value }" />
      <ion-label>{{ chip.label }}</ion-label>
    </ion-chip>
  </div>

  <!-- My Tasks List -->
  <div v-if="selectedTab === 'myTask'">
    <div v-if="myTasks?.length" class="task-list">
      <div v-for="(task, index) in myTasks" :key="index" class="task-card">
        <template v-if="task.photo">
           <img :src="imageUrl(task.photo)" alt="task photo" class="task-photo" />
        </template>
        <template v-else>
          <div class="avatar-placeholder">{{ getAvatarLetter(task.work_order_type) }}</div>
        </template>
        <div style="display: flex; justify-content: space-between; align-items: center;width: 100%;">
        <div class="task-details" style="flex-grow: 1;">
          <p class="task-title">
            <ion-icon :icon="briefcaseOutline" class="task-icon"></ion-icon>
            {{ task.work_order_type }}
          </p>
          <p class="task-location">
            <ion-icon :icon="locationOutline" class="task-icon"></ion-icon>
            {{ task.location }}
          </p>
          <p class="task-description">
            <ion-icon :icon="documentTextOutline" class="task-icon"></ion-icon>
            {{ task.description }}
          </p>
        </div>
      </div>
      </div>
    </div>
    <p v-else class="no-task-message">No tasks available</p>
  </div>

  <!-- All Tasks List -->
  <div v-if="selectedTab === 'allTask'">
    <div v-if="allTasks?.length" class="task-list">
      <div v-for="(task, index) in allTasks" :key="index" class="task-card">
        <template v-if="task.photo">
           <img :src="imageUrl(task.photo)" alt="task photo" class="task-photo" />
        </template>
        <template v-else>
          <div class="avatar-placeholder">{{ getAvatarLetter(task.work_order_type) }}</div>
        </template>
        <div style="display: flex; justify-content: space-between; align-items: center;width: 100%;">
        <div class="task-details" style="flex-grow: 1;">
          <p class="task-title">
            <ion-icon :icon="constructOutline" class="task-icon"></ion-icon>
            {{ task.work_order_type }}
          </p>
          <p class="task-location">
            <ion-icon :icon="locationOutline" class="task-icon"></ion-icon>
            {{ task.location }}
          </p>
          <p class="task-description">
            <ion-icon :icon="documentTextOutline" class="task-icon"></ion-icon>
            {{ task.description }}
          </p>
        </div>

        <div class="task-status">
          <ion-chip class="status-chip">{{ task.work_order_status }}</ion-chip>
        </div>
      </div>
      </div>
    </div> 
    <p v-else class="no-task-message">No tasks available</p>
  </div>
</template>

<style scoped>

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
} 
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
  cursor: pointer;
}

.custom-chip.active {
  background: #8594DC;
  color: white;
}

.active-icon {
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
  gap: 15px;
}

.task-details p {
  margin: 5px 0; /* Apply controlled margin for all p tags inside task-details */
}

.task-icon { 
  margin-right: 6px;
  font-size: 1rem;
  vertical-align: middle;
}

.task-location {
  font-size: 0.85rem;
  font-weight: 500;
  color: #555;
}

.task-card {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  gap: 12px;
  align-items: center;
}

.task-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  background-color: aqua;
  flex-shrink: 0;
}

.task-title {
  font-weight: bold;
  color: #333;
}

.task-description {
  font-size: 0.9rem;
  color: #777;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-word; /* Ensures better text wrapping */
  overflow: hidden;
}

.no-task-message {
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-top: 10px;
}

.status-chip {
  font-size: 0.85rem;
  color: #fff;
  background-color: #8594dc;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #333;
  font-weight: bold;
  border-radius: 50%;
  flex-shrink: 0;
}

</style>
