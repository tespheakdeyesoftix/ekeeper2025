<script setup lang="ts">
import { ref } from 'vue';
import Img from '@/views/components/Img.vue';
import { IonChip, IonIcon, IonLabel, IonText, IonButton, IonRippleEffect, IonCard, IonCardContent } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { list, today, briefcaseOutline, locationOutline, documentTextOutline, constructOutline } from 'ionicons/icons';
import { imageUrl } from '@/helpers/utils';
import { getAvatarLetter } from '@/helpers/utils';
import { RouterLink, useRouter } from 'vue-router'; 
import ComTaskCard from '@/views/task/components/ComTaskCard.vue'; 

const { t } = useI18n();
const router = useRouter()

const props = defineProps({
  allTasks: Object,
  myTasks: Object
});

const chips = ref([
  { id: 1, label: 'My Task', icon: list, value: 'myTask' },
  { id: 2, label: 'All Task', icon: today, value: 'allTask' }
]);

const selectedTab = ref('myTask');

const setSelectedTab = (tab: string) => {
  selectedTab.value = tab;
};
</script>

<template>
<div class="header-container">
        <ion-text color="secondary">
          <h2>{{ t("Recent List") }}</h2>
        </ion-text>
  <ion-button size="small" class="view-all-btn" @click="() => router.push('/task')">
    {{ t("View all Tasks") }}
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
      <ion-label>{{ t(chip.label) }}</ion-label>
    </ion-chip>
  </div>

  <!-- My Tasks List --> 
  <div v-if="selectedTab === 'myTask'">  
  <div v-if="myTasks?.length">
    <RouterLink 
      v-for="(task, index) in myTasks"
      :key="index"
      :to="`/task-detail/${task.name}`"
      style="text-decoration: none;"
    >
      <ComTaskCard :task="task" />
    </RouterLink>
  </div>
  <ion-text v-else class="no-task-message">No tasks available</ion-text>
</div>

  <!-- All Tasks List --> 
  <div v-if="selectedTab === 'allTask'">  
  <div v-if="allTasks?.length">
    <RouterLink 
      v-for="(task, index) in allTasks"
      :key="index"
      :to="`/task-detail/${task.name}`"
      style="text-decoration: none;"
    >
      <ComTaskCard :task="task" />
    </RouterLink>
  </div>
  <ion-text v-else class="no-task-message">No tasks available</ion-text>
</div>
</template> 
<style scoped>

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
} 
.view-all-btn { 
  padding: 6px 2px;  
  --border-radius: 6px;
  --background: #3c449c;
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
.custom-chip.active, .active-icon {
  background: #8594DC;
  color: white;
}     
.no-task-message {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  color: #888;
}    
</style>
