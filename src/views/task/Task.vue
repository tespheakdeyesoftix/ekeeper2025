<template>
  <ion-page>
<AppBar>Task</AppBar>
<button @click="childEvent">Raise Child Event</button>

<ion-content class="ion-pading">
   <DocList ref="myComponentRef" docType="Employee" :fields="['name','photo']" >
    <template v-slot:default="{ item }">
            <h3>{{ item.name }}</h3>  
            {{ item }}
    </template>
   </DocList>
   
</ion-content>
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