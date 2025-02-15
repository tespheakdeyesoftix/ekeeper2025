<template>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ t("Select") }} {{ title ?? docType  }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item>
        <ion-label>Some Content Here</ion-label>
      </ion-item>
      <ion-footer>
        <ion-button @click="dismissModal">Close</ion-button>
        <ion-button @click="onConfirm">Confirm</ion-button>
      </ion-footer>
    </ion-content>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { modalController,IonButton,IonContent,IonToolbar,IonTitle,IonFooter,IonLabel,IonItem,IonHeader } from '@ionic/vue';
  import { useI18n } from 'vue-i18n';
const { t } = useI18n();


  const props = defineProps({
    docType:String,
    title:String,
  });

 
  const onConfirm = () => modalController.dismiss("Hello World", 'confirm');

  
 
  const dismissModal = () => {
    modalController.dismiss(null, 'cancel')
  };
  </script>
  