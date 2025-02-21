<template>
  <div>
    <div class="scroll-container">
      <!-- Date -->
      <ion-chip style="padding: 0">
        <ion-datetime-button datetime="selectedDate"></ion-datetime-button>
      </ion-chip>
      <ComSelect
        @onSelected="onSelectRoomStatus"
        multiple
        docType="Room Status"
        clear
      />
      <ComSelect
        @onSelected="onSelectHousekeepingStatus"
        label="Housekeeping Status"
        docType="Housekeeping Status Code"
        clear
        multiple
      />
      <ComSelect
        label="Housekeeper"
        docType="Employee"
        filter=""
        :clear="false"
        multiple
      />
      <ComSelect docType="Building" filter="" :clear="false" multiple />
      <ComSelect docType="Floor" :filter="{}" :clear="false" multiple />
    </div>

    <!-- Modal Date -->
    <ion-modal :keep-contents-mounted="true">
      <ion-datetime
        id="selectedDate"
        presentation="date"
        v-model="selectedDate"
        :format-options="formatOptions"
        :show-default-buttons="true"
      ></ion-datetime>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/hooks/useRoom";
import { ref } from "vue";
 
const {onFilter,filter} = useRoom()

const formatOptions = {
  date: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
};

function onSelectRoomStatus(selected: any) {
  
  onFilter({...filter.value,room_status:selected.map((r: any) => r.name)});
 

}
function onSelectHousekeepingStatus(selected: any) {

  // onFilter({ status: selected.map((r: any) => r.name) });
}
 
</script>

<style scoped>
.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
