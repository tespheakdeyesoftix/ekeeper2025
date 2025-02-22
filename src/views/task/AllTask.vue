<template>
<ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ t("All Task") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
         
        <DocList  docType="Work Order" 
      :fields="['name','work_order_type','location','description','photo','work_order_status']" 

       >
 
     <template v-slot:default="{ item }">
        
             <ComTaskCard :task="item" @onClick="onViewTaskDetail"/>
     </template>
    </DocList> 
    </ion-content>
</ion-page>
</template>
<script lang="ts" setup>
import { useIonRouter } from '@ionic/vue';
import ComTaskCard from "@/views/task/components/ComTaskCard.vue";
const t =window.t;
const ionRouter = useIonRouter();


function onViewTaskDetail(task: any) {
  ionRouter.navigate('/task-detail/' + task.name, 'forward', 'push');
}


</script>