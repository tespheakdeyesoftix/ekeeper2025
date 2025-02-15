<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>App</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>

    <ion-modal
      trigger="open-modal"
      :initial-breakpoint="0.25"
      :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle"
    >
      <ion-content class="ion-padding">
        <!-- Custom Handle -->
        <div class="custom-handle">
          <ion-label>Swipe here to adjust height</ion-label>
        </div>
        
        <!-- Modal Content -->
        <div class="ion-margin-top">
          <ion-label>Click the handle above to advance to the next breakpoint.</ion-label>
        </div>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script lang="ts" setup>
  import { IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonLabel } from '@ionic/vue';
</script>

<style scoped>
.custom-handle {
  height: 50px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

ion-modal {
  --height: 70%; /* Initial height of the modal */
}

ion-modal > ion-content {
  pointer-events: none; /* Disable interactions with the modal content */
}

.custom-handle {
  pointer-events: auto; /* Enable interactions only on the handle */
}
</style>
