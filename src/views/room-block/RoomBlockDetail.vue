<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
          <ion-title>{{t("Room Block Detail")}}</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-content>
          <h1>hellow</h1>
          {{ doc }}
          
          <hr/>

          <hr>
            <Document v-model="doc" docType="Room Block" :docName="name" >
              
            </Document>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

const route = useRoute();
const name = ref(route.params.name);
const t = window.t
const doc = ref()
</script>