<template>
    <ion-page>
       <ToolBar>{{t("Task Detail")}}</ToolBar>
      <ion-content class="ion-padding">
      
        <Document  
         v-if="name" 
         docType="Work Order" 
         :docName="name"
         v-model:doc = "doc"
         v-model:docInfo = "docInfo"
         >
         {{ doc.description }}
        </Document>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

const route = useRoute();
const name = ref(route.params.name);
 const t = window.t;
 
 const doc = ref()
 const docInfo = ref()
  </script>
   