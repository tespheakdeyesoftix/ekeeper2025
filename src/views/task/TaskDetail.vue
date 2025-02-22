<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
          <ion-title>{{t("Task Detail")}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
          <Document v-if="name" docType="Work Order" :docName="name" >
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
 
  </script>
   