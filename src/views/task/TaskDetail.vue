<template>
  <ion-page>
    <ToolBar>{{ t("Task Detail") }}</ToolBar>
    <ion-content class="ion-padding">
      <Document v-if="name" docType="Work Order" :docName="name" v-model:doc="doc" v-model:docInfo="docInfo">
        <div>

          <ion-text color="primary">
            <h1 class="ion-no-margin">{{ t(doc.work_order_type) }}</h1>
          </ion-text>

          <!-- Status Chips -->
          <ion-chip color="success">
            <ion-icon :icon="checkmarkCircleOutline" class="ion-margin-right" />
            <ion-label>{{ t(doc.work_order_status) }}</ion-label>
          </ion-chip>
          <ion-chip color="warning">
            <ion-icon :icon="alertCircleOutline" class="ion-margin-right" />
            <ion-label>{{ t(doc.priority) }}</ion-label>
          </ion-chip>

          <!-- Description Section -->
          <ion-text color="medium">
            <h3 class="ion-margin-bottom">Description</h3>
            <p>{{ doc.description }}</p>
          </ion-text>
        </div>





        <p v-for="(us, index) in doc.assign_employee" :key="index">

          <!-- {{ docInfo.user_info[us.user]?.image }}  -->
          <!-- {{ docInfo.user_info[us.user] }} -->
          <!-- {{ us.employee_name }}   
        {{ docInfo.user_info[us.user]?.image || 'No matching user image' }} -->
        </p>
        <!-- {{ doc.assign_employee }} -->
        <!-- {{ docInfo.user_info }} -->

        <ion-card class="task-detail-card ion-padding ion-no-margin">
          <ion-card-header class="ion-text-center" > 
            <ion-card-title style="font-weight: bold;">{{ doc.name }}</ion-card-title>
            <!-- <ion-chip class="status-chip">
              <ion-icon :icon="checkmarkCircleOutline" class="chip-icon status-icon" />
              {{ doc.work_order_status }}
            </ion-chip>               -->
          </ion-card-header>

          <ion-card-content class="ion-no-padding">
            <ion-list>
              <ion-item>
                <ion-icon :icon="createOutline" class="item-icon" color="success" />
                <ion-label>{{ t("Modifier") }}</ion-label>
                <ion-text>{{ doc.modified_by }}</ion-text>
              </ion-item>
              <ion-item>
                <ion-icon :icon="timeOutline" class="item-icon" />
                <ion-label>{{ t("Creation") }}</ion-label>
                <ion-text>{{ formatDate(doc.creation) }}</ion-text>
              </ion-item>
              <ion-item>
                <ion-icon :icon="locationOutline" class="item-icon" color="danger" />
                <ion-label>{{ t("Location") }}</ion-label>
                <ion-text>{{ doc.location }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-icon :icon="hourglassOutline" class="item-icon" color="warning" />
                <ion-label>{{ t("Posting Date") }}</ion-label>
                <ion-text>{{ formatDate(doc.posting_date) }}</ion-text>
              </ion-item>
              <ion-item style="--border-style:none;">
                <ion-icon :icon="calendarOutline" class="item-icon calendar-icon" color="primary" />
                <ion-label>{{ t("Due Date") }}</ion-label>
                <ion-text>{{ formatDate(doc.due_date) }}</ion-text>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Assigned Employees Card -->
        <ion-card class="task-detail-card ion-margin-top ion-no-margin"
          v-if="doc.assign_employee && doc.assign_employee.length">

          <ion-card-header class="employee-header">
            <ion-card-title>
              {{ t("Assigned Employees") }}
              <ion-icon :icon="peopleOutline" color="success" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content class="ion-no-padding">
            <ion-list class="employee-list">
              <ion-item v-for="(employee, index) in doc.assign_employee" :key="employee.idx">
                <template v-if="docInfo.user_info[employee.user]?.image">
                  <ion-avatar class="employee-avatar" slot="start">
                    <Img :src="docInfo.user_info[employee.user]?.image" />
                  </ion-avatar>
                </template>
                <template v-else>
                  <ion-avatar slot="start" class="avatar-placeholder " :style="{ backgroundColor: getRandomColor() }">{{
                    getAvatarLetter(employee?.employee_name) }}</ion-avatar>
                </template>
                <ion-label>
                  <h3 class="employee-name">{{ employee.employee_name }}</h3>
                  <p class="employee-role">{{ employee.user }}</p>
                  <p class="employee-note">{{ employee.note }}</p>
                </ion-label>

                <ion-icon :id="'menuTrigger' + index" :icon="ellipsisVerticalOutline" @click="openPopover($event, index)"
                  class="menu-icon" button/>

                <!-- Popover for the Menu -->
                <ion-popover :is-open="popoverStates[index]?.open" :event="popoverStates[index]?.event"
                  @didDismiss="popoverStates[index].open = false">
                  <ion-content>
                    <ion-list> 
                      <!-- Action item inside the Popover -->
                      <ion-item button detail="false" @click="deleteEmployee(employee, index)"
                      style="--border-style:none;">
                      <ion-icon :icon="personRemoveOutline" slot="start" color="danger"/>
                        Unassign Employee 
                        
                      </ion-item>
                    </ion-list>
                  </ion-content>
                </ion-popover>

              </ion-item>
              <!-- FAB inside an ion-item -->
              <ion-item lines="none" class="fab-item">
                <ion-fab horizontal="end">
                  <ion-fab-button size="small">
                    <ion-icon :icon="personAddOutline" />
                  </ion-fab-button>
                </ion-fab>
              </ion-item>
            </ion-list>

          </ion-card-content>
        </ion-card>

        <TaskFile/>

        <TaskImage :doc="doc" @update:doc="doc = $event" />



      </Document>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { locationOutline, alertCircleOutline, menu, checkmarkCircleOutline,ellipsisVerticalOutline
  , createOutline, timeOutline, hourglassOutline, constructOutline, documentTextOutline, calendarOutline, peopleOutline, personAddOutline,personRemoveOutline, pencil, key } from "ionicons/icons";
import Img from "../components/Img.vue";
import TaskImage from "./components/TaskImage.vue";
import TaskFile from "./components/TaskFile.vue";
import { getAvatarLetter, getRandomColor } from "@/helpers/utils";
import dayjs from 'dayjs';


const route = useRoute();
const name = ref(route.params.name);
const t = window.t;

const doc = ref();
const docInfo = ref();


const formatDate = (dateString) => {
  return dayjs(dateString).format('MMM DD, YYYY')
}

const popoverStates = ref({}); 

// Open Popover
const openPopover = (event, index) => {
  if (!popoverStates.value[index]) {
    popoverStates.value[index] = { open: false, event: null };
    console.log(popoverStates.value[index]);
  }
  popoverStates.value[index].event = event;
  popoverStates.value[index].open = true;
};
 
const closePopover = (index) => {
  if (popoverStates.value[index]) {
    popoverStates.value[index].open = false;
  }
};


const deleteEmployee = (employee, index) => {
  console.log("Employee Deleted:", doc.value);   
  alert(employee.employee_name)
    // doc.value.assign_employee.splice(index, 1)
    closePopover(index);
    
 
};




</script>

<style scoped>
.task-detail-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(63, 38, 38, 0.12);
}

.task-header {
  /* align-items: center; */
  /* padding: 10px; */
}

.task-header ion-card-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}

.status-chip {
  font-size: 0.9rem;
  font-weight: 600;
  background: #f2f2f2;
  color: #555;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 6px 12px;
}

.status-icon {
  color: #007bff;
  font-size: 1rem;
  margin-right: 5px;
}

/* ion-item { 
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;  
}  */
ion-card-content {
  display: content;
}

.item-icon {
  font-size: 1.2rem;
  margin-right: 5px;
}

.priority-chip {
  font-size: 0.9rem;
  font-weight: 600;
  background: #fff4e5;
  color: #d35400;
}

.employee-header ion-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.employee-avatar {
  width: 60px !important;
  height: 60px !important;
}

.employee-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.employee-role {
  font-size: 0.9rem;
  color: #666;
}

.employee-note {
  font-size: 0.85rem;
  color: #999;
}

ion-fab-button {
  box-shadow: none !important;
  --box-shadow: none;
  --background: var(--ion-color-success);
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #FFF;
}
</style>
