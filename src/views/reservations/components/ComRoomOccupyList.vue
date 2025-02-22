<template>
  <Loading v-if="loading" />
  <template v-else>
    <ComSearchBar class="ion-padding" />

    <ion-list>
      <ion-item v-for="(d, index) in data" :key="index" lines="none">
        <ComReservationCard :data="d" />
      </ion-item>
    </ion-list>

  </template>

</template>
<script lang="ts" setup>
import { useApp } from '@/hooks/useApp';
import { postApi } from '@/services/api-service';
import { onMounted, ref } from 'vue';
import ComReservationCard from '@/views/reservations/components/ComReservationCard.vue';

import ComSearchBar from "@/views/components/ComSearchBar.vue";

const props = defineProps({
  date: String
})

defineExpose({
  LoadData
});

const data = ref<any[]>([])

const { currentProperty } = useApp()
const loading = ref(true)
async function LoadData() {
  
  const reponse = await postApi("edoor.mobile_api.frontdesk.get_occupy_list",
    {
      param: {
        property: currentProperty.value.property_name,
        date: props.date
      }
    })
  if (!reponse.error) {
    data.value = reponse.data

  }

  loading.value = false;

}

 


onMounted(async () => {

  await LoadData();
})

</script>