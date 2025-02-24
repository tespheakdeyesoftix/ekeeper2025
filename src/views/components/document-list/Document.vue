<template>
 
      <Loading v-if="loading"></Loading>
      <template v-else>
        <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
 
        <slot :item="data">
          {{ data }}
             
        </slot>
      </template>
       
    
    
</template>
<script setup lang="ts">
import { useDocument } from '@/hooks/useDocument';
import {defineModel} from "vue"
const props = defineProps({
    docType:String,
    docName:String
})
const modelValue = defineModel();
const {data,onRefresh,loading} = useDocument(props,modelValue)

 

</script>