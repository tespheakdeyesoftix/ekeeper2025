<template>
  <ion-card class="ion-no-margin ion-margin-bottom">
    <ion-card-header>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <ion-card-subtitle>{{ t("Room Type") }}</ion-card-subtitle>
          <ion-card-title class="ion-no-margin">
            {{ t("Room Type") }}
          </ion-card-title>
        </div>
        <div>
          <ion-icon :icon="airplane" class="icon" size="large" />
        </div>
      </div>
    </ion-card-header>
    <ion-card-content>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>
          <h6>{{ t("Room Name") }}</h6>
          <h1>A 100</h1>
        </div>
        <div>
          <h6>{{ t("Floor") }}</h6>
          <h1>First</h1>
        </div>
        <div>
          <h6>{{ t("Group Type") }}</h6>
          <h1>First</h1>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { airplane } from "ionicons/icons";
const t = window.t;
</script>
