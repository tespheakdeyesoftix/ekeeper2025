<template>
  <ion-page>
<AppBar>Task</AppBar>
<ion-content class="ion-pading">
   <DocList docType="Employee" :fields="['name','photo']">
    <template v-slot:default="{ item }">
            <h3>{{ item.name }}</h3>  
            {{ item }}
    </template>
   </DocList>
   
</ion-content>
</ion-page>
</template>

<script setup lang="ts">
    alert(123)
 </script>