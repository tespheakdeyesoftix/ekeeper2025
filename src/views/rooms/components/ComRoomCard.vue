<template>
    <ion-card v-longPress="onLongPress" button>
      <ion-ripple-effect></ion-ripple-effect>
      <ion-card-header color="primary" style="border-bottom: 1px solid gray; padding: 5px;">
        <ion-card-title style="text-align: center;">{{ data?.room_number }} - {{ data?.floor_alias }}</ion-card-title>
      </ion-card-header>
  
      <ion-card-content style="padding: 3px; font-size: 12;">
        <ion-label>Pokémon Yel</ion-label>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    data:Object
  })

  const emit = defineEmits()

  function onLongPress(){
 
    emit("onLongPress",props.data)
  }



  </script>