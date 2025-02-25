<template> 
  <div class="card-container"> 
    <ion-card
      v-for="(task, index) in taskList"
      :key="index"
      :style="{ backgroundColor: getCardColor(task.status) }"  
      class="status-card ion-activatable ripple-parent"
    >

      <div class="number-top-left">{{ task.ongoing }}</div>
      
      <ion-icon :icon="getIcon(task.status)" class="status-icon icon-top-right"></ion-icon>
 
      <h3 class="bottom-left">{{ t(task.status) }}</h3>
      <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/useApp';
import { useAuth } from '@/hooks/useAuth';
import { getApi } from '@/services/api-service';
import { refreshOutline, checkmarkCircleOutline, timeOutline, closeCircleOutline } from 'ionicons/icons';
import { ref, onMounted } from 'vue';


const {currentProperty,currentWorkingDate} = useApp()
const {currentUser} = useAuth()
const taskList = ref<any[]>([]);
const t = window.t
// Function to fetch data from the API
const response = async () => {
  const { data, error } = await getApi(
    'edoor.mobile_api.task.get_user_task_summary',
    {
      property: currentProperty.value.property_name,
      user: currentUser.value.name,
      date: currentWorkingDate.value
    }
  );

  if (data) {
    console.log('API Response:', data);
    taskList.value = [
      { status: 'Ongoing', ongoing: data.ongoing },
      { status: 'Complete', ongoing: data.complete },
      { status: 'In Progress', ongoing: data.in_progress },
      { status: 'Cancelled', ongoing: data.cancelled }
    ];  
  } else {
    console.error('API Error:', error);
  }
};
 
onMounted(() => {
  response();
});
 
const getCardColor = (status: string) => {
  switch (status) {
    case 'Ongoing':
      return 'var(--ion-color-primary)';
    case 'Complete':
      return 'var(--ion-color-success)';
    case 'In Progress':
      return 'var(--ion-color-warning)';
    case 'Cancelled':
      return 'var(--ion-color-danger)';
    default:
      return 'var(--ion-color-light)';
  }
}; 
const getIcon = (status: string) => {
  switch (status) {
    case 'Ongoing':
      return refreshOutline;
    case 'Complete':
      return checkmarkCircleOutline;
    case 'In Progress':
      return timeOutline;
    case 'Cancelled':
      return closeCircleOutline;
    default:
      return refreshOutline; // Default icon
  }
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two cards per row */
}

.status-card {
  position: relative;
  height: 100px; /* Fixed height for each card */
  border-radius: 20px;
  gap: 10px;
  margin: 5px;
}

.number-top-left {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: rgb(245, 244, 248);
}

.status-icon {
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
}

.bottom-left {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
}
</style>
