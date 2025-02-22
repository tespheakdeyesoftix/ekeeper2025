<template>
  <ion-page>
    <AppBar>{{ t("Task") }}</AppBar>

    <ion-content class="ion-padding">

<ion-grid>
  <ion-row class="row-container">
    <ion-col style="background-color: var(--ion-color-primary);" class="status-card ion-activatable ripple-parent">
      <div class="number-top-left">1</div>
      <ion-icon :icon="refreshOutline" class="status-icon icon-top-right"></ion-icon>
      <h2 class="bottom-left">Ongoing</h2>
      <ion-ripple-effect></ion-ripple-effect>
    </ion-col>
    <ion-col style="background-color: var(--ion-color-warning);" class="status-card ion-activatable ripple-parent">
      <div class="number-top-left">2</div>
      <ion-icon :icon="timeOutline" class="status-icon icon-top-right"></ion-icon>
      <h2 class="bottom-left">In Process</h2>
      <ion-ripple-effect></ion-ripple-effect>
    </ion-col>
  </ion-row>
  <ion-row class="row-container">
    <ion-col style="background-color: var(--ion-color-success);" class="status-card ion-activatable ripple-parent">
      <div class="number-top-left">3</div>
      <ion-icon :icon="documentOutline" class="status-icon icon-top-right"></ion-icon>
      <h2 class="bottom-left">Complete</h2>
      <ion-ripple-effect></ion-ripple-effect>
    </ion-col>
    <ion-col style="background-color: var(--ion-color-danger);" class="status-card cancel ion-activatable ripple-parent">
      <div class="number-top-left">4</div>
      <ion-icon :icon="closeOutline" class="status-icon icon-top-right"></ion-icon>
      <h2 class="bottom-left">Cancel</h2>
      <ion-ripple-effect></ion-ripple-effect>
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
      :showSearchBar="false"
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
  height: 100px;
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

/* Ripple effect styles */
.ripple-parent {
  position: relative;
  overflow: hidden;
}
.number-top-left {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;  /* Change the text color if needed */
}

.icon-top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;  /* Adjust the size of the icon if necessary */
  color: white;  /* Change the icon color if needed */
}

.bottom-left {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 18px;
  color: white;  /* Change the text color if needed */
}
 
</style>