<template>
  <ion-page>
    <AppBar>{{t("Home")}}</AppBar>
    <ion-content :fullscreen="true">
      <Loading v-if="loading"/>
        <template v-else>
          <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
          <ComSelect docType="Employee"  labelPrefix="Select" modalType="sheet_modal" @onSelected="onSelected" @onClear="onClearMe"/>
 
          <ComSelect docType="Product" label="Select Products" modalType="modal">

            
          </ComSelect>
          <ComSelect docType="Work Order Type" :multiple="true" >
            open modul multple select
          </ComSelect>
        
          <ComWelcome />
  
          <ComOccupancyChart :data="{occupancy:data?.summary.occupancy, occupy:data?.summary.total_room_occupy, total_room_vacant:data?.summary.total_room_vacant,occupy_color:data?.summary.occupy_color, vacant_color:data?.summary.vacant_color }"  /> 
   
 
           <ComSummaryKPI :data="data?.summary" />
 
   
          <ComRoomStatus :data="data?.room_status" />
          <div style="padding: 0 5px">
            <ComRecentList :allTasks="data?.all_tasks" :myTasks="data?.my_tasks" />
          </div> 
         </template>
 
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useHome } from '@/hooks/useHome';
import { IonPage, IonContent, IonButton,IonRefresher,IonRefresherContent } from '@ionic/vue';
import ComWelcome from "@/views/home/components/ComWelcome.vue"
import ComSummaryKPI from "@/views/home/components/ComSummaryKPI.vue"
import ComRoomStatus from "@/views/home/components/ComRoomStatus.vue"
import ComOccupancyChart from "@/views/home/components/ComOccupancyChart.vue"
import ComRecentList from "@/views/home/components/ComRecentList.vue"
import ComSelect from "@/views/components/ComSelect.vue"

const { loading, data,currentProperty ,onRefresh} = useHome()
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

function onSelected(data:any){
 
}

function onClearMe(){
  
}

     
</script>
