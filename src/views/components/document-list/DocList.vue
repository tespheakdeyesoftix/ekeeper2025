<template>
    <div v-for="(d, index) in data" :key="index">
        <slot :item="d">
            <!-- Default fallback content -->
            {{ d.name }}
        </slot>
    </div>
</template>
<script setup lang="ts">
import { useDocList } from '@/hooks/useDocList';
const emit = defineEmits()
const props = defineProps({
    docType:String,
    filters:Object,
    orFilter:Object,
    fields:{
        type:Object,
        default:["name"]
    }
})
 
const {data} = useDocList(props)

const triggerItemClicked = () => {
    
        alert("hell world")
    
};
defineExpose({ triggerItemClicked });

</script>