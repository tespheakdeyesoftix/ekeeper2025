<template>
  <div style="margin: 0px 5px">
    <div
      class="scroll-container ion-margin-vertical"
      style="
        background-color: var(--ion-color-light-shade);
        border-radius: 20px;
        padding: 2px;
      "
    >
      <ion-chip color="dark"
        >FN2025-25456
        <ion-text
          style="
            background-color: var(--ion-color-success);
            padding: 1px 10px;
            margin-left: 5px;
            border-radius: 5px;
          "
          color="dark"
        >
          Open
        </ion-text>
      </ion-chip>
      <ion-chip color="medium"
        >FN2025-25456
        <ion-text
          style="
            background-color: var(--ion-color-success);
            padding: 1px 10px;
            margin-left: 5px;
            border-radius: 5px;
          "
          color="dark"
        >
          Open
        </ion-text>
      </ion-chip>
    </div>
    <!-- Post Charge -->
    <div style="display: flex; justify-content: flex-end">
      <ion-button
        shape="round"
        size="small"
        color="primary"
        class="ion-no-margin"
      >
        <ion-icon slot="start" name="wallet-outline"></ion-icon>
        Post Charge
      </ion-button>
    </div>
    <ion-grid>
      <ion-row>
        <ion-col style="padding: 5px">
          <ion-card class="ion-no-margin" style="background-color: var(--ion-color-success-shade);" >
            <ion-card-content class="ion-no-padding" style="padding: 5px;">
              <h6 style="color: var(--ion-color-light);">Total Debit</h6>
              <h6 style="color: var(--ion-color-light);">$10</h6>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col style="padding: 5px">
          <ion-card class="ion-no-margin" style="background-color: var(--ion-color-primary-shade);" >
            <ion-card-content class="ion-no-padding" style="padding: 5px;">
              <h6 style="color: var(--ion-color-light);">Total Credit</h6>
              <h6 style="color: var(--ion-color-light);">$0</h6>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col style="padding: 5px">  
          <ion-card class="ion-no-margin" style="background-color: var(	--ion-color-light-shade);" >
            <ion-card-content class="ion-no-padding" style="padding: 5px;">
              <h6 style="color: var(--ion-color-light);">Balance</h6>
              <h6 style="color: var(--ion-color-light);">$10</h6>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid> 
    <!-- Table -->
    <ion-card-content class="ion-no-padding ion-no-margin">
      <ion-list lines="full">
        <ion-item>
          <ion-grid class="ion-no-padding">
            <ion-row>
              <ion-col size="4">
                <h6>{{ t("Name#") }}</h6>
                <h6>{{ t("Room#") }}</h6>
              </ion-col>
              <ion-col size="3">
                <h6>{{ t("Post Date") }}</h6>
                <h6>{{ t("Account") }}</h6>
              </ion-col>
              <ion-col size="1" class="ion-text-center">
                <h6>{{ t("QTY") }}</h6>
              </ion-col>
              <ion-col size="2" class="ion-text-center">
                <h6>{{ t("Debit") }}</h6>
              </ion-col>
              <ion-col size="2" class="ion-text-center">
                <h6>{{ t("Credit") }}</h6>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
        <ion-item color="medium">
          <ion-grid class="ion-no-padding">
            <ion-row>
              <ion-col size="4">
                <h6>FT2025-2556</h6>
                <h6>102</h6>
              </ion-col>
              <ion-col size="3">
                <h6>01-01-2025</h6>
                <h6>Minibar</h6>
              </ion-col>
              <ion-col size="1" class="ion-text-center">
                <h6>1</h6>
              </ion-col>
              <ion-col size="2" class="ion-text-center">
                <h6>$10</h6>
              </ion-col>
              <ion-col size="2" class="ion-text-center">
                <h6>$5</h6>
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
import { addIcons } from "ionicons";
import { walletOutline } from "ionicons/icons";
addIcons({ walletOutline });
import dayjs from "dayjs";
const t = window.t;
const props = defineProps({
  data: Object,
});
const data = [{}];
</script>
<style scoped>
.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
.truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.flex {
  display: flex;
  align-items: center;
}
ion-item {
  --padding-start: 0px; /* Remove padding from the start (left) */
  --padding-end: var(--padding-end, 16px);
}
</style>
