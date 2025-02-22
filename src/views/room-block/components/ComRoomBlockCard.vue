<template>
    <ion-card button @click="onClick">
        {{ data }}
    </ion-card>

</template>
<script setup lang="ts">
const props = defineProps({
    data:Object
})
const emit = defineEmits()

function onClick (){
    emit("onClick",props.data)
}
</script>