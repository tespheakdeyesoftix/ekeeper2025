<template> 
     <Img :src="doc?.photo"/>
     <ion-button>upload pic</ion-button>
</template>

<script setup lang="ts">
import Img from '@/views/components/Img.vue';
import { defineProps, PropType } from 'vue';

const props = defineProps({
  doc: Object
});

</script>