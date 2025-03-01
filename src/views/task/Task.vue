<template>
  <ion-page>
    <AppBar>{{ t("Task") }}</AppBar>
    <ion-content class="ion-padding">

      <TaskSummaryKpi    />  

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
import { ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import { refreshOutline, timeOutline, documentOutline, closeOutline, gitCompareOutline, key } from 'ionicons/icons';
import ComTaskCard from "./components/ComTaskCard.vue";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import { useHome } from "@/hooks/useHome";
import TaskSummaryKpi from "./TaskSummaryKpi.vue";
import DocList from "../components/document-list/DocList.vue";



const ionRouter = useIonRouter();
const {currentUser} = useAuth()
const {currentProperty,currentWorkingDate} = useApp()

const t = window.t;

function onViewTaskDetail(task: any) {
 
  ionRouter.navigate('/task-detail/' + task.name, 'forward', 'push');
}  
  

function onRefresh(){   
  
}

  

</script> 