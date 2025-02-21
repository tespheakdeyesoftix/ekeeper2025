<template>
  <ion-page>
<AppBar>{{ t("Task") }}</AppBar>
<ion-button @click="childEvent">Raise Child Event</ion-button>

<ion-content class="ion-pading">
   <DocList :showSearchBar="true" ref="myComponentRef" docType="Product" :fields="['name']"  >
     
    <template v-slot:default="{ item }">

            <h3>{{ item.name }}</h3>  
        
    </template>
   </DocList>
   
</ion-content>
</ion-page>
</template>

<script setup lang="ts">
    import { ref } from "vue";
const t = window.t 

const myComponentRef = ref();
    const childEvent = () => {
    if (myComponentRef.value) {
        myComponentRef.value.triggerItemClicked();
    }
};
 </script>