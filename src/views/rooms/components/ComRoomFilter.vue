<template>
  <div>
    <div class="scroll-container">
      <!-- Date -->
      <ion-chip style="display: none;">
        <ion-datetime-button datetime="selectedDate"></ion-datetime-button>
      </ion-chip>
      <ion-chip  @click="showModal = true">
    <ion-icon size="small" :icon="calendar"></ion-icon>
    <ion-label>    {{dayjs(selectedDate).format("DD-MM-YYYY") }}</ion-label>
  </ion-chip>
      <ComSelect
        @onSelected="onSelectRoomStatus"
        @onClear="onClearRoomStatus"
        multiple
        docType="Room Status"
        :selectedValues="['Vacant']"
        clear
        ref="RoomStatusRef"
      />
      <ComSelect
        @onSelected="onSelectHousekeepingStatus"
        @onClear="onClearHousekeepingStatus"
        label="Housekeeping Status"
        docType="Housekeeping Status Code"
        clear
        multiple
        ref="HousekeepingStatusRef"
      />
      <ComSelect
        @onSelected="onSelectHousekeeper"
        @onClear="onClearHousekeeper"
        label="Housekeeper"
        docType="Employee"
        clear
        multiple
        ref="Housekeepeer"
      />
      <ComSelect
        @onSelected="onSelectBuilding"
        @onClear="onClearBuilding"
        docType="Building"
        :filters="[['property', '=', currentProperty.property_name]]"
        clear
        multiple
        ref="Building"
      />
      <ComSelect
        @onSelected="onSelectFloor"
        @onClear="onClearFloor"
        docType="Floor"
        :filters="floorFilter"
        clear
        multiple
        ref="Floor"
      />
      <ion-chip @click="onClearFilter" color="danger">Clear</ion-chip>
    </div>

    <!-- Modal Date -->
    <ion-modal :is-open="showModal" @ionModalDidDismiss="showModal = false" :keep-contents-mounted="true">
      <ion-datetime
        id="selectedDate"
        presentation="date"
        v-model="selectedDate"
        :format-options="formatOptions"
        :show-default-buttons="true"
      ></ion-datetime>
    </ion-modal>
    <!-- Group by -->
    <ion-segment @ionChange="onChangeGroupBy" value="floor">
      <ion-segment-button value="floor">
        <ion-label>{{ t("Floor") }}</ion-label>
      </ion-segment-button>
      <ion-segment-button value="room_type">
        <ion-label>{{ t("Room Type") }}</ion-label>
      </ion-segment-button>
    </ion-segment>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/hooks/useRoom";
import { ref, computed } from "vue";
const t = window.t;
const { onFilter, filter, onChangeGroupBy, currentProperty } = useRoom();
const roomStatusRef = ref(null)
import { ellipsisVertical, logoIonic , calendar } from 'ionicons/icons';
const RoomStatusRef = ref(null);
const HousekeepingStatusRef = ref(null);
const Housekeepeer = ref(null);
const Building = ref(null);
const Floor = ref(null);
const showModal = ref(false)
const selectedDate = ref()
import dayjs from 'dayjs';
const formatOptions = {
  date: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
};

const floorFilter = computed(() => {
  if (filter.value.building) {
    return [
      ["property", "=", currentProperty.value.property_name],
      ["building", "in", filter.value.building],
    ];
  }
  return [["property", "=", currentProperty.value.property_name]];
});

function onSelectRoomStatus(selected: any) {
  onFilter({ ...filter.value, room_status: selected.map((r: any) => r.name) });
}
function onClearRoomStatus() {
  delete filter.value.room_status;
  onFilter(filter.value);
}

function onSelectHousekeepingStatus(selected: any) {
  onFilter({
    ...filter.value,
    housekeeping_status_code: selected.map((r: any) => r.name),
  });
}
function onClearHousekeepingStatus() {
  delete filter.value.housekeeping_status_code;
  onFilter(filter.value);
}

function onSelectHousekeeper(selected: any) {
  onFilter({ ...filter.value, employee: selected.map((r: any) => r.name) });
}
function onClearHousekeeper() {
  delete filter.value.employee;
  onFilter(filter.value);
}

function onSelectBuilding(selected: any) {
  onFilter({ ...filter.value, building: selected.map((r: any) => r.name) });
}
function onClearBuilding() {
  delete filter.value.building;
  onFilter(filter.value);
}

function onSelectFloor(selected: any) {
  onFilter({ ...filter.value, floor: selected.map((r: any) => r.name) });
}
function onClearFloor() {
  delete filter.value.floor;
  onFilter(filter.value);
}
function onClearFilter() {
  RoomStatusRef.value.onClear();
  HousekeepingStatusRef.value.onClear();
  Housekeepeer.value.onClear();
  Building.value.onClear();
  Floor.value.onClear();
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
