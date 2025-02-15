<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
        <ion-title>{{ t("Select") }} {{ title ?? docType }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-searchbar 
        placeholder="Search" 
        class="fixed-searchbar"
      ></ion-searchbar>

    <ion-content>
     
      <ion-list>
        <!-- Cards Displaying Data -->
        <ion-card 
          class="custom-card" 
          v-for="(d, index) in data" 
          :key="index" 
          @click="onSelect(d)" 
          button
        >
          <ion-ripple-effect></ion-ripple-effect>
          <ion-card-header>
            <ion-card-title>{{ d.label ?? d.value }}</ion-card-title>
            <ion-card-subtitle v-if="d.description">{{ d.description }}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </ion-list>

      <!-- Infinite Scroll -->
       <div style="padding-bottom: 50px;">
      <ion-infinite-scroll 
        @ionInfinite="onLoadMore" 
        threshold="0"  
      >
        <ion-infinite-scroll-content loading-text="Loading more..."></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </div>
    </ion-content>

 
  </ion-page>
</template>
  
  <script setup>
  import { useComSelect } from '@/hooks/useComSelect';
import {IonCardTitle, IonButtons,IonBackButton, IonPage,IonSearchbar, IonCard,IonCardHeader, IonCardSubtitle,IonRippleEffect, IonInfiniteScroll, IonInfiniteScrollContent,  modalController,
  IonButton,IonContent,IonToolbar,IonTitle,IonFooter,IonLabel,IonList,IonItem,IonHeader } from '@ionic/vue';
  import { useI18n } from 'vue-i18n';
const { t } = useI18n();


  const props = defineProps({
    docType:String,
    title:String,
  });

  const {loading, onLoadMore,data,onSelect} = useComSelect({docType:props.docType});


 
  const onConfirm = () => modalController.dismiss("Hello World", 'confirm');

  
 
  const dismissModal = () => {
    modalController.dismiss(null, 'cancel')
  };
  </script>


<style scoped>


ion-list {
  padding: 0;
  margin: 0;
}

.custom-card {
  margin: 10px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

ion-infinite-scroll {
  --padding-bottom: 60px; /* Ensure enough space at the bottom */
}
.fixed-searchbar {
  position: sticky;
  top: 0;
  z-index: 10; /* Adjust the z-index if needed */
  background-color: white; /* Ensure background is solid */
}

 
  </style>
  
 