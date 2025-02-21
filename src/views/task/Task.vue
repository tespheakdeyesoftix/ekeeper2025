<template>
  <ion-page>
<AppBar>Task</AppBar>
<button @click="childEvent">Raise Child Event</button>

<ion-content class="ion-pading">
   <DocList :showSearchBar="true" ref="myComponentRef" docType="Product" :fields="['name']"  >
     
    <template v-slot:default="{ item }">

            <h3>{{ item.name }}</h3>  
        
    </template>
   </DocList> 
</ion-content> -->

</ion-page>
</template>

<script setup lang="ts">
    import { ref } from "vue";
 

    const myComponentRef = ref();
        const childEvent = () => {
        if (myComponentRef.value) {
            myComponentRef.value.triggerItemClicked();
        }
    };
 </script>
 <style scoped>
 .grid-container {
   padding: 16px; 
   /* background-color: aqua; */
 }
 
 .row-container {
   display: flex;
   gap: 12px;
   margin-bottom: 16px;
 }
 
 .status-card {
   flex: 1;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 110px;
   border-radius: 16px;
   color: white;
   font-weight: bold;
   font-size: 1rem;
   position: relative;
   overflow: hidden; 
   cursor: pointer;
 }
 
 .status-icon {
   font-size: 26px;
   margin-bottom: 8px;
 }
  
 .ongoing {
   background-color: #8e6fb6;
 }
 
 .in-process {
   background-color: #f5b971;
 }
 
 .complete {
   background-color: #88c86b;
 }
 
 .cancel {
   background-color: #f47c7c;
 }
 
 /* Ripple effect styles */
 .ripple-parent {
   position: relative;
   overflow: hidden;
 }
 /* All Task Button Styling */
.all-task-button-container {
  padding: 0 12px;
  /* margin-top: 10px; */
}

ion-button {
  --border-radius: 12px;
  --background: #3880ff;
  font-weight: bold;
}
 </style>