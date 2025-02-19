<template>
  
    <ComRoomGroup  
        @onLongPress="onLongPress" v-for="(g, index) in groupData"  
        :key="index" 
        :value="index.toString()" 
        :title="group_by=='room_type'?g.room_type:g.floor" 
        :data="getRoom(group_by=='room_type'?g.room_type_id:g.floor)"
    />
</template>
<script setup lang="ts">
import ComRoomGroup from "@/views/rooms/components/ComRoomGroup.vue"
import { computed } from "vue";
const emit = defineEmits()
const props = defineProps({
    data:Object,
    group_by:{
        type:String,
        default:"room_type"
    }
})


 
const groupData = computed(()=>{
    if(props.group_by =="room_type"){
        return  Array.from(
            new Map(props.data?.map(({ room_type_id, room_type }) => [room_type_id + room_type, { room_type_id, room_type }])).values()
    )
    }else {
        return  Array.from(
            new Map(props.data?.map(({ floor, floor_alias }) => [floor + floor_alias, { floor, floor_alias }])).values()
    )
 }
    
});

function getRoom(value:string){
    if(props.group_by == "room_type"){
        return props.data?.filter((r:any)=>r.room_type_id == value)
    }else {
        return props.data?.filter((r:any)=>r.floor == value)
    }
    
}


function onLongPress(data:any){
  emit("onLongPress",data)
}


 
</script>