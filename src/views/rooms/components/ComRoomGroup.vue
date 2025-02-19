<template>
  <div>
    <ion-accordion-group :value="[value]" >
      <ion-accordion :value="value" >
        <ion-item slot="header" color="light">
          <ion-label>{{ title }}</ion-label>
        </ion-item>
        <div   class="ion-padding" slot="content" style="padding: 0px; display: grid; grid-template-columns: repeat(3, 1fr);">
       
          <ComRoomCard @onLongPress="onLongPress" v-for="(d, index) in data" :key="index" :data="d" />
        </div>
      </ion-accordion>
    </ion-accordion-group> 
 
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title:String,
  value:String,
  data:Object
})
 
import ComRoomCard from "@/views/rooms/components/ComRoomCard.vue";
const emit = defineEmits()
function onLongPress(data:any){
  emit("onLongPress",data)
}

</script>
