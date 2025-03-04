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
      {{ docInfo.user_info }}
        <ion-card class="task-detail-card ion-no-margin">
          <ion-card-header class="task-header">
            <ion-card-title>{{ doc.name }}</ion-card-title>
            <ion-chip class="status-chip">
              <ion-icon :icon="checkmarkCircleOutline" class="chip-icon status-icon" />
              {{ doc.work_order_status }}
            </ion-chip>              
          </ion-card-header>

          <ion-card-content>
            <ion-list class="task-list">
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
        <ion-card class="employee-card ion-no-margin" v-if="doc.assign_employee && doc.assign_employee.length">
          <ion-card-header class="employee-header">
            <ion-card-title>
              {{ t("Assigned Employees") }}
              <ion-icon :icon="peopleOutline" color="success" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list class="employee-list">
              <ion-item v-for="(employee, index) in doc.assign_employee" :key="index" button>
                <ion-avatar class="employee-avatar" slot="start"> 
                  <Img :src="docInfo.user_info.Administrator.image" />
                  <!-- <ion-icon color="primary" :icon="personCircleOutline" style="width: 50px; height: 50px;"/> -->
                </ion-avatar>
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

        <ion-card class="employee-card">
  <ion-card-header class="employee-header">
    <ion-card-title>{{ t("Task Image") }}</ion-card-title>
  </ion-card-header>

  <ion-card-content>
    <ion-row>
      <!-- Action Buttons on the left -->
      <ion-col size="6" class="ion-gap-2">
        <ion-button expand="full" @click="addPic">{{ t("Add Pic") }}</ion-button>
        <ion-button expand="full" @click="uploadPic">{{ t("Upload Pic") }}</ion-button>
        <ion-button expand="full" @click="deletePic">{{ t("Delete Pic") }}</ion-button>
      </ion-col>

      <!-- Image on the right -->
      <ion-col size="6" class="ion-text-center">
        <Img :src="doc.photo" width="150" height="150" style="border-radius: 50%;"/>
      </ion-col>
    </ion-row>
  </ion-card-content>
</ion-card>

        

      </Document>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { 
  locationOutline, 
  alertCircleOutline, 
  checkmarkCircleOutline, 
  constructOutline, 
  documentTextOutline, 
  calendarOutline ,
  personCircleOutline,
  peopleOutline,
  personAddOutline ,
  pencil,
  key
} from "ionicons/icons";
import Img from "../components/Img.vue";

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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  background: white;
  padding: 15px;
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



/* Employee Card */
.employee-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  background: white;
  padding: 10px;
  margin-top: 20px;
}

.employee-header ion-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
} 

.employee-avatar {
  width: 50px !important;
  height: 50px !important; 
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

</style>
