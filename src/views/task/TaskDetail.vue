<template>
  <ion-page>
    <ToolBar>{{ t("Task Detail") }}</ToolBar>
    <ion-content class="ion-no-padding"> 
      <Document
        v-if="name"
        docType="Work Order"
        :docName="name"
        v-model:doc="doc"
        v-model:docInfo="docInfo"
      >
        <ion-card class="task-detail-card ">
          <ion-card-header>
            <ion-card-title>{{ doc.name }}</ion-card-title>
            <template v-if="doc.photo">
              <ion-avatar style="width: 150px; height: 150px;">
                <Img :src="doc.photo" />
              </ion-avatar>
            </template>
            <template v-else>
                <ion-avatar class="avatar-placeholder"  :style="{ backgroundColor: getRandomColor() }">{{ getAvatarLetter(doc?.work_order_type) }}</ion-avatar>
            </template>
            <ion-chip color="primary">{{ doc.work_order_status }}</ion-chip>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>{{ t("Property") }}</ion-label>
                <ion-text>{{ doc.property }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-label>{{ t("Location") }}</ion-label>
                <ion-text>{{ doc.location }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-label>{{ t("Priority") }}</ion-label>
                <ion-chip color="warning">{{ doc.priority }}</ion-chip>
              </ion-item>

              <ion-item>
                <ion-label>{{ t("Work Order Type") }}</ion-label>
                <ion-text>{{ doc.work_order_type }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-label>{{ t("Description") }}</ion-label>
                <ion-text>{{ doc.description }}</ion-text>
              </ion-item>

              <ion-item>
                <ion-label>{{ t("Due Date") }}</ion-label>
                <ion-text>{{ doc.due_date }}</ion-text>
              </ion-item>
 
            </ion-list>
          </ion-card-content>
        </ion-card>
      </Document>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Img from "../components/Img.vue";
import { getAvatarLetter,getRandomColor } from '@/helpers/utils';


const route = useRoute();
const name = ref(route.params.name);
const t = window.t;

const doc = ref();
const docInfo = ref();
 
</script>

<style scoped>
.task-detail-card {
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-photo {
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
}
.avatar-placeholder {
  width: 150px;
  height: 150px;
  color: white;
  text-align: center;
  align-content: center;
  font-size: 32px;
  font-weight: bold;
  border-radius: 50%;  
}
</style>
