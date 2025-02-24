<template>
    <ion-refresher slot="fixed" @ionRefresh="onRefreshData($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

      
    <Loading v-if="loading"/>
    <template v-else>
        <slot name="searchBar">
            <ComSearchBar v-if="showSearchBar" @onSearch="onSearch" />
        </slot>
 
    <div v-if="data && data.length>0" v-for="(d, index) in data" :key="index">
        <slot :item="d">
            {{ d.name }}
        </slot>
    </div>
    <div v-else>
        <slot  name="empty">
            No Data
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
 
const {data,onRefresh,onLoadMore,onSearch,loading} = useDocList(props)
const onRefreshData = async (event: CustomEvent) => {
    await onRefresh(event)
    event.target.complete();
    emit("onRefresh")
  };
 

</script>