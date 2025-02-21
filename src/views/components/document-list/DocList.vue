<template>
    <ion-refresher slot="fixed" @ionRefresh="onRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <slot name="searchBar">
            <ComSearchBar v-if="showSearchBar" @onSearch="onSearch" />
        </slot>

    <div v-for="(d, index) in data" :key="index">
        <slot :item="d">
            <!-- Default fallback content -->
            {{ d.name }}
        </slot>
    </div>
    <div style="padding-bottom: 50px;">
      <ion-infinite-scroll 
        @ionInfinite="onLoadMore" 
        threshold="0"  
      >
        <ion-infinite-scroll-content loading-text="Loading more..."></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </div>
</template>
<script setup lang="ts">
import { useDocList } from '@/hooks/useDocList';
import ComSearchBar from '../ComSearchBar.vue';
const emit = defineEmits()
const props = defineProps({
    docType:String,
    filters:Object,
    orFilter:Object,
    searchFields:Object,
    showSearchBar:{
        type:Boolean,
        default:true
    },
    fields:{
        type:Object,
        default:["name"]
    }
})
 
const {data,onRefresh,onLoadMore,onSearch} = useDocList(props)

const triggerItemClicked = () => {
    
        alert("hell world")
    
};
defineExpose({ triggerItemClicked });

</script>