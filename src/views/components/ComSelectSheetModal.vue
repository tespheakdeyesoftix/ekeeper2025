<template>
  <ion-page>
    <ion-header>
  <ion-toolbar>
    <!-- Close Button (Left) -->
    <ion-buttons slot="start">
      <ion-button size="large" fill="clear" @click="dismissModal">
        <ion-icon :icon="closeOutline"></ion-icon>
      </ion-button>
    </ion-buttons>

    <!-- Title (Centered) -->
    <ion-title>{{ t("Select") }} - {{ title ?? docType }}</ion-title>

    <!-- Confirm Button (Right) -->
    <ion-buttons v-if="multiple" slot="end">
      <ion-button  shape="round" fill="solid" color="success" @click="confirmSelection" size="large"> 
        <ion-icon :icon="checkmarkOutline" slot="start" size="large"></ion-icon>
        {{ t("Confirm") }}
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>


    <ion-searchbar 
        placeholder="Search" 
        @click="expandModal" 
        v-model="keyword"
        @ionInput="Search"
      ></ion-searchbar>

    <ion-content>
     
      <div class="spinner-container" v-if="loading">
 
        <ion-spinner></ion-spinner>
   
      </div>
  
 

      <template v-else>
        <ion-list>
       <ComSelectCard v-for="(d, index) in data" :key="index" :data="d" 
          @onSelect="onSelect(d)" 
          valueField="name"
          :labelField="meta.title_field"
          :descriptionFields="meta.search_fields"
          :photoField="meta.image_field"
          :selectedValue = "props.selectedValue"
          :selectedValues = "props.selectedValues"
       />
        
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
      </template>
      
    </ion-content>

 
  </ion-page>
</template>

  <script setup>
    import { useComSelect } from '@/hooks/useComSelect';
    import {IonSpinner, IonCardTitle, IonButtons,IonBackButton, IonIcon, IonPage,IonSearchbar, IonCard,IonCardHeader, IonCardSubtitle,IonRippleEffect, IonInfiniteScroll, IonInfiniteScrollContent,  
    IonButton,IonContent,IonToolbar,IonTitle,IonFooter,IonLabel,IonList,IonItem,IonHeader,modalController } from '@ionic/vue';
    import { checkmarkOutline, closeOutline } from "ionicons/icons";
    import ComSelectCard from "@/views/components/ComSelectCard.vue"

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();


  const props = defineProps({
    docType:String,
    title:String,
    multiple:Boolean,
    selectedValue:String,
    selectedValues:Object
  });

  const { meta, loading, onLoadMore,data,onSelect,onConfirm,dismissModal,expandModal,keyword,Search} = useComSelect(props);
 

  
 
 
  </script>


<style scoped>
.spinner-container {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
  
 