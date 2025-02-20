<template>
  group by = {{ groupBy }}
  <ion-accordion-group multiple
    :value="
      Array.from({ length: groupData.length }, (_, index) => index.toString())
    "
  >
    <ComRoomGroup
      v-for="(g, index) in groupData"
      :key="index"
      :value="index.toString()"
      :title="groupBy == 'room_type' ? g.room_type : g.floor"
      :data="getRoom(groupBy == 'room_type' ? g.room_type_id : g.floor)"
    />
  </ion-accordion-group>
</template>
<script setup lang="ts">
import { useRoom } from "@/hooks/useRoom";
import ComRoomGroup from "@/views/rooms/components/ComRoomGroup.vue";
import { computed } from "vue";
const { groupBy } = useRoom();

const props = defineProps({
  data: Object,
});

const groupData = computed(() => {
  if (groupBy.value == "room_type") {
    return Array.from(
      new Map(
        props.data?.map(({ room_type_id, room_type }) => [
          room_type_id + room_type,
          { room_type_id, room_type },
        ])
      ).values()
    );
  } else {
    return Array.from(
      new Map(
        props.data?.map(({ floor, floor_alias }) => [
          floor + floor_alias,
          { floor, floor_alias },
        ])
      ).values()
    );
  }
});

function getRoom(value: string) {
  if (groupBy.value == "room_type") {
    return props.data?.filter((r: any) => r.room_type_id == value);
  } else {
    return props.data?.filter((r: any) => r.floor == value);
  }
}
</script>
