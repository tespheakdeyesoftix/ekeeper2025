<template>
    <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <slot :item="data">
          {{ data }}
             
        </slot>
    
    </ion-content>
</template>
<script setup lang="ts">
import { useDocument } from '@/hooks/useDocument';

const props = defineProps({
    docType:String,
    docName:String
})
const {data,onRefresh} = useDocument(props)
</script>