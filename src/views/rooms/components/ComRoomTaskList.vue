<template>
  <div class="ion-no-margin">
    <ion-text
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <h3>{{ t("Task List") }}</h3>
      <ion-button
        shape="round"
        size="small"
        color="primary"
        class="ion-no-margin"
      >
        <ion-icon slot="start" name="add-outline"></ion-icon>
        Add Task
      </ion-button>
    </ion-text>
    <div v-if="Task?.length">
      <RouterLink
        v-for="(task, index) in Task"
        :key="index"
        :to="`/task-detail/${task.name}`"
        style="text-decoration: none"
      >
        <ComTaskCard :task="task" />
      </RouterLink>
    </div>
    <ion-text v-else class="no-task-message">No tasks available</ion-text>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import ComTaskCard from "@/views/task/components/ComTaskCard.vue";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";
addIcons({ addOutline });
const t = window.t;
// const props = defineProps({
//     Task: Object,
// });
const Task = ref([
  {
    creation: "2025-02-13 10:54:27.121151",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quae quisquam eius, nisi iure laborum eum architecto repellendus dolore odio.",
    location: "Lobby",
    modified: "2025-03-10 15:29:39.220776",
    modified_by: "Administrator",
    name: "WO2025-0001",
    owner: "Administrator",
    photo: "/files/avatar-cartoon.png",
    posting_date: "2025-01-25",
    work_order_status: "New",
    work_order_type: "Elevator Maintenance",
    _assign: '["Administrator", "meygb@gmail.com", "boromey@gmail.com"]',
  },
  {
    creation: "2025-03-06 16:35:31.841144",
    description: "Bruh\n",
    location: "Swimming Pool",
    modified: "2025-03-08 08:35:57.863392",
    modified_by: "Administrator",
    name: "WO2025-0002",
    owner: "Administrator",
    photo: "/files/avatar-cartoon.png",
    posting_date: "2025-01-25",
    work_order_status: "Completed",
    work_order_type: "Energy & Utility Management",
    _assign:
      '["boromey@gmail.com", "Administrator", "hengfo@mail.com", "meygb@gmail.com"]',
  },
]);
</script>

<style></style>
