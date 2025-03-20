<template>
  <div style="margin: 0px 5px">
    <!-- Stay Information -->
    <ion-card-content class="ion-no-padding ion-no-margin">
      <ion-list lines="full">
        <ion-item>
          <ion-grid class="ion-no-padding">
            <ion-row>
              <ion-col size="3">
                <h6>{{ t("Date") }}</h6>
              </ion-col>
              <ion-col size="3">
                <h6>{{ t("Room") }}</h6>
              </ion-col>
              <ion-col size="3">
                <h6>{{ t("PAX(A/C)") }}</h6>
              </ion-col>
              <ion-col size="3">
                <h6>{{ t("Rate Type") }}</h6>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
        <ion-item  color="medium">
          <ion-grid class="ion-no-padding" >
            <ion-row>
              <ion-col size="3">
                <h6>01-01-25</h6>
              </ion-col>
              <ion-col size="3">
                <h6>DDR/102</h6>
              </ion-col>
              <ion-col size="3">
                <h6>1/3</h6>
              </ion-col>
              <ion-col size="3">
                <h6>Rate Include F/B</h6>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </ion-card-content>
    
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import dayjs from "dayjs";
const t = window.t;
const props = defineProps({
  data: Object,
});
</script>
<style scoped>
.truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.avatar-placeholder {
  width: 60px;
  height: 60px;
  color: white;
  text-align: center;
  align-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  flex-shrink: 0;
}
.flex {
  display: flex;
  align-items: center;
}
ion-item {
  --padding-start: 0px; /* Remove padding from the start (left) */
  --padding-end: var(--padding-end, 16px);
  --padding: 0px;
}
</style>
