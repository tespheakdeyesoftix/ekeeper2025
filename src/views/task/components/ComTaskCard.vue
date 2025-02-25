<script setup lang="ts">
import { defineProps } from 'vue';
import { IonCard, IonCardContent, IonAvatar, IonIcon, IonChip } from '@ionic/vue';
import { constructOutline, locationOutline, documentTextOutline } from 'ionicons/icons';
import { getAvatarLetter,getRandomColor } from '@/helpers/utils';
 
import { useI18n } from 'vue-i18n';
import Task from '../Task.vue';
import Img from '@/views/components/Img.vue'; 
import { color } from 'echarts';
import { Style } from '@capacitor/status-bar';

const emit = defineEmits()

const { t } = useI18n() 
const props = defineProps({
  task: Object
});

function onClick(){
emit('onClick',props.task);
}
   
</script>
<template>   
  <ion-card button @click="onClick" class="ion-margin-bottom ion-no-margin">
    <ion-card-content class="task-card">
      <div>
      <template v-if="task?.photo">
        <ion-avatar style="width: 60px; height: 60px;">
          <Img :src="task.photo"  />
        </ion-avatar>
      </template>
      <template v-else>
        <ion-avatar class="avatar-placeholder" :style="{ backgroundColor: getRandomColor() }">{{ getAvatarLetter(task?.work_order_type) }}</ion-avatar>
      </template>
    </div> 
      <div class="task-details">
        <div>
          <h3 class="task-title">
            <ion-icon :icon="constructOutline" class="task-icon"></ion-icon>
            {{ t(task?.work_order_type) }}
          </h3>
          <h3 class="task-location">
            <ion-icon :icon="locationOutline" class="task-icon"></ion-icon>
            {{ t(task?.location) }}
          </h3>
          <h3 class="task-description">
            <ion-icon :icon="documentTextOutline" class="task-icon"></ion-icon>
            {{ t(task?.description) }}
          </h3>
        </div>
        <h3>
          <ion-chip color="success" style="font-size: 12px;">{{ task?.work_order_status }}</ion-chip>
        </h3>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
.task-card {
  display: flex;
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
  word-break: break-word; 
  overflow: hidden;
}

.task-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  color: white;
  text-align: center;
  align-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  flex-shrink: 0;
}

</style>
