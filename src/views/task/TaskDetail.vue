<template>
  <ion-page>
    <ToolBar>{{ t("Task Detail") }}</ToolBar>
    <ion-content class="ion-no-padding"> 
      <Document
        v-if="name"
        docType="Work Order"
        :docName="name"
        v-model:doc="doc"
        v-model:docInfo="docInfo"
      > 
      <p v-for="(us , index) in doc.assign_employee" :key="index">

        <!-- {{ docInfo.user_info[us.user]?.image }}  -->
        <!-- {{ docInfo.user_info[us.user] }} -->
        <!-- {{ us.employee_name }}   
        {{ docInfo.user_info[us.user]?.image || 'No matching user image' }} -->
      </p>
      {{ doc.photo }}
      <!-- {{ docInfo.user_info }} -->

        <ion-card class="task-detail-card ion-padding">
          <ion-card-header class="task-header">
            <ion-card-title>{{ doc.name }}</ion-card-title>
            <ion-chip class="status-chip">
              <ion-icon :icon="checkmarkCircleOutline" class="chip-icon status-icon" />
              {{ doc.work_order_status }}
            </ion-chip>              
          </ion-card-header>

          <ion-card-content class="ion-no-padding">
            <ion-list>
              <ion-item>
                <ion-icon :icon="locationOutline" class="item-icon" color="success" />
                <ion-label>{{ t("Location") }}</ion-label>
                <ion-text>{{ doc.location }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-icon :icon="alertCircleOutline" style color="warning" />
                <ion-label>{{ t("Priority") }}</ion-label>
                <ion-chip color="warning" class="priority-chip">
                  <ion-icon :icon="alertCircleOutline" style="margin-right: 5px;" />
                  {{ doc.priority }}
                </ion-chip>
              </ion-item>

              <ion-item>
                <ion-icon :icon="constructOutline" class="item-icon" color="medium"/>
                <ion-label>{{ t("Work Order Type") }}</ion-label>
                <ion-text>{{ doc.work_order_type }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-icon :icon="documentTextOutline" class="item-icon" />
                <ion-label>{{ t("Description") }}</ion-label>
                <ion-text>{{ doc.description }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-icon :icon="calendarOutline" class="item-icon calendar-icon" color="primary"/>
                <ion-label>{{ t("Due Date") }}</ion-label>
                <ion-text>{{ doc.due_date }}</ion-text>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card> 

        <!-- Assigned Employees Card -->
        <ion-card class="task-detail-card ion-margin-top" v-if="doc.assign_employee && doc.assign_employee.length">
          <ion-card-header class="employee-header">
            <ion-card-title>
              {{ t("Assigned Employees") }}
              <ion-icon :icon="peopleOutline" color="success" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list class="employee-list">
              <ion-item v-for="(employee, index) in doc.assign_employee" :key="index" button>
                <template v-if="docInfo.user_info[employee.user]?.image">
                  <ion-avatar class="employee-avatar" slot="start"> 
                    <Img :src="docInfo.user_info[employee.user]?.image" />
                  </ion-avatar>
                </template>
                <template v-else>
                  <ion-avatar slot="start" class="avatar-placeholder " :style="{ backgroundColor: getRandomColor()}">{{ getAvatarLetter(employee?.employee_name) }}</ion-avatar>
                </template>
                <ion-label> 
                  <h3 class="employee-name">{{ employee.employee_name }}</h3>
                  <p class="employee-role">{{ employee.user }}</p>
                  <p class="employee-note">{{ employee.note }}</p>
                </ion-label>
              </ion-item> 
                <!-- FAB inside an ion-item -->
                <ion-item lines="none" class="fab-item"> 
                  <ion-fab  horizontal="end">
                    <ion-fab-button size="small">
                      <ion-icon :icon="personAddOutline "/>
                    </ion-fab-button>
                  </ion-fab>  
                </ion-item>
            </ion-list>
            
          </ion-card-content>
        </ion-card>  


        <TaskImage :doc="doc" @update:doc="doc = $event"  />
 


      </Document>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { locationOutline, alertCircleOutline, checkmarkCircleOutline, constructOutline, documentTextOutline, calendarOutline, peopleOutline, personAddOutline, pencil, key } from "ionicons/icons";
import Img from "../components/Img.vue";
import TaskImage from "./components/TaskImage.vue";
import { uploadFile } from "@/services/api-service";
import { getAvatarLetter, getRandomColor } from "@/helpers/utils";

const route = useRoute();
const name = ref(route.params.name);
const t = window.t;

const doc = ref();
const docInfo = ref();

// const email = ref('Administrator')
// const userImage = computed(()=>{
//     user = Object.entries(docInfo.value).filter(([key,value]) => value.name === email.value)
//     return user.length > 0 ? user[0][1].image : null
// }) 
 


</script>

<style scoped> 
.task-detail-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(63, 38, 38, 0.12);  
} 
.task-header { 
  align-items: center;
  padding: 10px;
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
 ion-item { 
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;  
} 
ion-card-content{
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
.avatar-placeholder{
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #FFF;
}
</style>
