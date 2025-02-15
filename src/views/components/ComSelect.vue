<template>
    
        <ion-button @click="openSheetModal">Open Sheet Modal</ion-button>
      
  </template>
  
  <script setup>
  import { modalController,IonButton } from '@ionic/vue';
  import ComSelectSheetModal from '@/views/components/ComSelectSheetModal.vue';
  const props = defineProps({
    docType:String,
    filter:Object
  })
  const openSheetModal = async () => {
    const modal = await modalController.create({
      component: ComSelectSheetModal,
      initialBreakpoint:0.75,
      breakpoints:[0.65, 0.75,0.95],
      swipeToClose: false,
      componentProps:{
        docType:props.docType,
        filter:props.filter
      }
    });
    await modal.present();
    
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      
    }
  };
  </script>
  
  <style scoped>
 ion-modal {
--border-radius: 10px;
padding-left: 15px;
padding-right: 15px;
background: red;
}

ion-modal.auto-height::part(content) {
    position: relative;
    --varPer: 50%;
    bottom: 0px;
    height: var(--varPer);
    top: calc(var(--varPer) / 2);
}
  </style>
  