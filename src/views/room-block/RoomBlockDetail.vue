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
            <Document docType="Room Block" :docName="name" >
              <template v-slot:default="{ item }">
                <h1>{{ item.docs[0].name }}</h1>
              </template>
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
</script>