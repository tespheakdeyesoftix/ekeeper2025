<template>
    
        <ion-button @click="openSheetModal">Open Sheet Modal</ion-button>
      
  </template>
  
  <script setup>
  import { modalController,IonButton } from '@ionic/vue';
  import ComSelectSheetModal from '@/views/components/ComSelectSheetModal.vue';
  
  const openSheetModal = async () => {
    const modal = await modalController.create({
      component: ComSelectSheetModal,
      initialBreakpoint:0.65,
      breakpoints:[0, 0.25, 0.5,0.65, 0.75,0.9],
      swipeToClose: true,  
      componentProps:{
        docType:"Employee"
      }
    });
    await modal.present();
    
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  