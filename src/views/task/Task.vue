<template>
  <ion-page>
    <AppBar>{{ t("Task") }}</AppBar>
    <ion-content class="ion-padding">

     <ComTaskKpiCard :label="t('Ongoing')" color="primary" :icon="timeOutline">{{ summaryData?.ongoing }}</ComTaskKpiCard>
     <ComTaskKpiCard :label="t('Complete')" color="success" :icon="timeOutline">{{ summaryData?.complete }}</ComTaskKpiCard>
     <ComTaskKpiCard :label="t('In Progress')" color="warning" :icon="timeOutline">{{ summaryData?.in_progress }}</ComTaskKpiCard>
     <ComTaskKpiCard :label="t('Cancelled')" color="danger" :icon="timeOutline">{{ summaryData?.cancelled }}</ComTaskKpiCard>

      <ion-button expand="block" router-link="/all-task">{{t("All Task")}}</ion-button>

      <ion-text>
        <h3>{{t("My Task")}} - {{ currentWorkingDate }}</h3>  
      </ion-text>
      
      <DocList 
      
      docType="Work Order"
      :fields="['name','work_order_type','location','description','photo','work_order_status']"
      :filters="[['_assign', 'like', `%${currentUser.name}%`],['property','like',  `%${currentProperty.property_name}%`],['workorder_date','<=', currentWorkingDate],['due_date','>=', currentWorkingDate]]"
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
  </ion-page> 
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import { refreshOutline, timeOutline, documentOutline, closeOutline, gitCompareOutline, key } from 'ionicons/icons';
import ComTaskCard from "./components/ComTaskCard.vue";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import { useHome } from "@/hooks/useHome";
import TaskSummaryKpi from "./TaskSummaryKpi.vue";
import DocList from "../components/document-list/DocList.vue";
import ComTaskKpiCard from "@/views/task/components/ComTaskKpiCard.vue"
import { getApi } from "@/services/api-service";


const ionRouter = useIonRouter();
const {currentUser} = useAuth()
const {currentProperty,currentWorkingDate} = useApp()

const t = window.t;
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

async function onRefresh() {  
  await getTaskSummaryData()
}

onMounted(async ()=>{
  await getTaskSummaryData()
})



</script>
<style scoped> 
 
</style>
