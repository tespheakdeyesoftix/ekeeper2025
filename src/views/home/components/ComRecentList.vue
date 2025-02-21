<script setup lang="ts">
import { ref } from 'vue';
import { IonChip, IonIcon, IonLabel, IonText, IonButton, IonRippleEffect, IonCard, IonCardContent } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { list, today, briefcaseOutline, locationOutline, documentTextOutline, constructOutline } from 'ionicons/icons';
import { imageUrl } from '@/helpers/utils';
import { getAvatarLetter } from '@/helpers/utils';
import { RouterLink, useRouter } from 'vue-router'; 
import Img from '@/views/components/Img.vue';

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
        <ion-card v-if="myTasks?.length" >
          <ion-card-content class="task-card">
                <template v-if="task.photo">
                  <ion-avatar>
                    <Img :src="task.photo" width="100" style="flex-shrink: 0;" />
                  </ion-avatar>
                </template>
                <template v-else>
                  <div class="avatar-placeholder">{{ getAvatarLetter(task.work_order_type) }}</div>
                </template>

                <div style="display: flex; justify-content: space-between; align-items: center;width: 100%;">
                <div>
                  <h3 class="task-title">
                    <ion-icon :icon="constructOutline" class="task-icon"></ion-icon>
                      {{ task.work_order_type }}
                  </h3>
                  <h3 class="task-location">
                    <ion-icon :icon="locationOutline" class="task-icon"></ion-icon>
                    {{ task.location }}
                  </h3>
                  <h3 class="task-description">
                    <ion-icon :icon="documentTextOutline" class="task-icon"></ion-icon>
                    {{ task.description }}
                  </h3>
                </div>
                <h3>
                  <ion-chip >{{ task.work_order_status }}</ion-chip>
                </h3>
                </div>
          </ion-card-content>
        </ion-card>
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
        <ion-card v-if="allTasks?.length" >
          <ion-card-content class="task-card">
                <template v-if="task.photo">
                  <ion-avatar>
                    <Img :src="task.photo" width="100"  />
                  </ion-avatar>
                </template>
                <template v-else>
                  <ion-avatar >{{ getAvatarLetter(task.work_order_type) }}</ion-avatar>
                </template>

                <div style="display: flex; justify-content: space-between; align-items: center;width: 100%;">
                <div>
                  <h3 class="task-title">
                    <ion-icon :icon="constructOutline" class="task-icon"></ion-icon>
                      {{ task.work_order_type }}
                  </h3>
                  <h3 class="task-location">
                    <ion-icon :icon="locationOutline" class="task-icon"></ion-icon>
                    {{ task.location }}
                  </h3>
                  <h3 class="task-description">
                    <ion-icon :icon="documentTextOutline" class="task-icon"></ion-icon>
                    {{ task.description }}
                  </h3>
                </div>
                <h3>
                  <ion-chip >{{ t(task.work_order_status) }}</ion-chip>
                </h3>
                </div>
          </ion-card-content>
        </ion-card>
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
.title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #c41a1a;
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

.custom-chip.active, .active-icon {
  background: #8594DC;
  color: white;
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
  padding: 15px; 
  gap: 12px;
  align-items: center; 
  cursor: pointer; 
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
  display: flex;
  justify-content: center;
  font-size: 1rem;
  color: #888;
}  

.avatar-placeholder {
  width: 60px;
  height: 60px;
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
