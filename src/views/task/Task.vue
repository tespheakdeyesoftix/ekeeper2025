<template>
  <ion-page>
    <AppBar>{{ t("Task") }} - {{ t(formatDate) }}</AppBar>
    <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ComTaskKpiCard :label="t('Ongoing')" color="primary" :icon="refreshOutline">{{ summaryData?.ongoing }}</ComTaskKpiCard>
        </ion-col>
        <ion-col>
          <ComTaskKpiCard :label="t('Complete')" color="success" :icon="checkmarkCircleOutline">{{ summaryData?.complete }}</ComTaskKpiCard>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
        <ComTaskKpiCard :label="t('In Progress')" color="warning" :icon="timeOutline">{{ summaryData?.in_progress }}</ComTaskKpiCard>
        </ion-col>
        <ion-col>
        <ComTaskKpiCard :label="t('Cancelled')" color="danger" :icon="closeCircleOutline">{{ summaryData?.cancelled }}</ComTaskKpiCard>
        </ion-col>
      </ion-row>
    </ion-grid>

      <ion-button expand="block" router-link="/all-task">{{t("All Task")}}</ion-button>

      <ion-text>
        <h3>{{t("My Task")}}</h3>  
      </ion-text>
      
      <DocList 
      
      docType="Work Order"
      :fields="['name','work_order_type','location','description','photo','work_order_status']"
      :filters="[
        ['_assign', 'like', `%${currentUser.name}%`],
        ['property','like',  `%${currentProperty.property_name}%`],
        ['workorder_date','<=', currentWorkingDate],
        ['due_date','>=', currentWorkingDate],
        ['work_order_status', 'in', ['New','In Progress']]
        ]"
      :showSearchBar="false" 
      @onRefresh="onRefresh"
      > 


        <template v-slot:default="{ item }">  
          <ComTaskCard :task="item" @onClick="onViewTaskDetail"/>
        </template>
        <template v-slot:empty>
          this is my custom no data message
        </template>
      </DocList>
    </ion-content>
    <ion-fab vertical="bottom" horizontal="end" @click="handleFabClick">
      <ion-fab-button color="success">
        <ion-icon :icon="add"/>
      </ion-fab-button>
    </ion-fab>
  </ion-page> 
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import { refreshOutline, timeOutline, closeCircleOutline, checkmarkCircleOutline, gitCompareOutline, key,add } from 'ionicons/icons';
import ComTaskCard from "./components/ComTaskCard.vue";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import ComTaskKpiCard from "@/views/task/components/ComTaskKpiCard.vue"
import { getApi } from "@/services/api-service";
import dayjs from 'dayjs';


const ionRouter = useIonRouter();
const {currentUser} = useAuth()
const {currentProperty,currentWorkingDate} = useApp()

const t = window.t;

const formatDate = dayjs(currentWorkingDate.value).format('MMM DD, YYYY')

function handleFabClick() {
  alert(123)
}

const summaryData=ref()
function onViewTaskDetail(task: any) {
  ionRouter.navigate('/task-detail/' + task.name, 'forward', 'push');
}
 
 
async function getTaskSummaryData(){
  const { data, error } = await getApi(
    'edoor.mobile_api.task.get_user_task_summary',
    {
      property: currentProperty.value.property_name,
      user: currentUser.value.name,
      date: currentWorkingDate.value
    } 
  );
  if(data){
    summaryData.value = data
  }
 
}

async function onRefresh(event) {  
  await getTaskSummaryData()
  event.target.complete();
}
onMounted(async ()=>{
  await getTaskSummaryData()
})



</script>
<style scoped> 
 
</style>
