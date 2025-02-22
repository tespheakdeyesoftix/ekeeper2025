<template>
  <ion-page>
    <AppBar>{{ t("Task") }}</AppBar>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="row-container">
          <ion-col class="status-card ongoing ion-activatable ripple-parent">
            <ion-icon :icon="refreshOutline" class="status-icon"></ion-icon>
            <h2>Ongoing</h2>

          </ion-col>
          <ion-col class="status-card in-process ion-activatable ripple-parent">
            <ion-icon :icon="timeOutline" class="status-icon"></ion-icon>
            <h2>In Process</h2>

          </ion-col>
        </ion-row>
        <ion-row class="row-container">
          <ion-col class="status-card complete ion-activatable ripple-parent">
            <ion-icon :icon="documentOutline" class="status-icon"></ion-icon>
            <h2>Complete</h2>
          </ion-col>
          <ion-col class="status-card cancel ion-activatable ripple-parent">
            <ion-icon :icon="closeOutline" class="status-icon"></ion-icon>
            <h2>Cancel</h2>

          </ion-col>
        </ion-row>
      </ion-grid>


      <ion-button expand="block" router-link="/all-task">All Task</ion-button>

      <ion-text>
        <h3>My Tasks</h3>
      </ion-text>
      
      <DocList 
      docType="Work Order"
      :fields="['name','work_order_type','location','description','photo','work_order_status']"
      
      >
      <!-- :filters="[['_assign','=',currentUser.name],['property','=',currentProperty.property_name]]" -->
        <template v-slot:default="{ item }">
          <ComTaskCard :task="item" @onClick="onViewTaskDetail"/>
        </template>
        <template v-slot:empty>
          this is my custom no data message
        </template>
      </DocList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import { refreshOutline, timeOutline, documentOutline, closeOutline, gitCompareOutline } from 'ionicons/icons';
import ComTaskCard from "./components/ComTaskCard.vue";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
const ionRouter = useIonRouter();
const {currentUser} = useAuth()
const {currentProperty} = useApp()

const t = window.t;

function onViewTaskDetail(task: any) {
 
  ionRouter.navigate('/task-detail/' + task.name, 'forward', 'push');
}

</script>
<style scoped>
.row-container {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.status-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 110px;
  border-radius: 16px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.status-icon {
  font-size: 26px;
  margin-bottom: 8px;
}

 
</style>