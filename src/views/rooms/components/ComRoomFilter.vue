<template>
  <div>
    <div class="scroll-container">
      <!-- Date -->
      <ion-chip style="padding: 0">
        <ion-datetime-button datetime="selectedDate"></ion-datetime-button>
      </ion-chip>
      <ComSelect
        @onSelected="onSelectRoomStatus"
        @onClear="onClearRoomStatus"
        multiple
        docType="Room Status"
        :selectedValues="['Vacant']"
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
        @onSelected="onSelectHousekeeper"
        label="Housekeeper"
        docType="Employee"
        :clear="false"
        multiple
      />
      <ComSelect
        @onSelected="onSelectBuilding"
        docType="Building"
        :filters="[['property','=',currentProperty.property_name]]"
        :clear="false"
        multiple
      />
      <ComSelect
        @onSelected="onSelectFloor"
        docType="Floor"
         :filters="floorFilter"
        :clear="false"
        multiple
      />
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
    <!-- Group by -->
    <ion-segment @click="onChangeGroupBy" value="room_type">
      <ion-segment-button value="room_type">
        <ion-label>{{ t("Room Type") }}</ion-label>
      </ion-segment-button>
      <ion-segment-button value="floor">
        <ion-label>{{ t("Floor") }}</ion-label>
      </ion-segment-button>
    </ion-segment>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/hooks/useRoom";
import { computed } from "vue";
const t = window.t;
const { onFilter, filter, onChangeGroupBy,currentProperty } = useRoom();

const formatOptions = {
  date: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
};

const floorFilter=computed(()=>{
  if(filter.value.building){
    return [["property",'=',currentProperty.value.property_name],["building",'in',filter.value.building]]
  }
  return [["property",'=',currentProperty.value.property_name]];
})

function onSelectRoomStatus(selected: any) {
  onFilter({ ...filter.value, room_status: selected.map((r: any) => r.name) });
}
function onClearRoomStatus() {
  delete  filter.value.room_status;
  onFilter(filter.value );
}

function onSelectHousekeepingStatus(selected: any) {
  onFilter({
    ...filter.value,
    housekeeping_status_code: selected.map((r: any) => r.name)
  });
}

function onSelectHousekeeper(selected: any) {
  onFilter({ ...filter.value, employee: selected.map((r: any) => r.name) });
}


function onSelectBuilding(selected: any) {
  onFilter({ ...filter.value, building: selected.map((r: any) => r.name) });
}

function onSelectFloor(selected: any) {
  onFilter({ ...filter.value, floor: selected.map((r: any) => r.name) });
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
