<template>
  <ion-card class="ion-no-margin ion-margin-bottom" style="border-radius: 10px">
    <ion-card-header>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <ion-card-title>
            {{ t("Room Information") }}
          </ion-card-title>
        </div>
        <div style="display: flex; align-items: center">
          <ion-card-subtitle
            style="
              background-color: var(--ion-color-success);
              color: #ffffff;
              border-radius: 20px;
              padding: 5px 10px;
              margin-right: 5px;
            "
            >{{ t("In-House") }}</ion-card-subtitle
          >
          <ion-icon
            :icon="brush"
            class="icon"
            style="
              background-color: var(--ion-color-light-shade);
              padding: 5px;
              border-radius: 100%;
            "
          />
        </div>
      </div>
    </ion-card-header>
    <ion-card-content class="ion-padding">
      <ion-grid class="ion-no-padding">
        <ion-row class="ion-justify-content-start">
          <ion-col size="6">
            <h6>{{ t("Room #") }}</h6>
            <h6>{{ t("Room Type") }}</h6>
            <h6>{{ t("Floor") }}</h6>
            <h6>{{ t("Build") }}</h6>
          </ion-col>
          <ion-col size="6">
            <div>A 001</div>
            <div>Single Room</div>
            <div>First Floor</div>
            <div>Building A</div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <h3 style="font-weight: bold">{{ t("Room Amenities") }}</h3>
      <div
        style="
          background-color: var(--ion-color-light-shade);
          border-radius: 10px;
          padding: 10px;
        "
      >
        <ion-text
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h6 style="font-weight: bold">{{ t("Note") }}</h6>
          <ion-button
            v-if="!note"
            shape="round"
            size="small"
            color="success"
            class="ion-no-margin"
            >Add New Note</ion-button
          >
          <ion-icon v-else :icon="create" class="icon" />
        </ion-text>
        <div
          v-if="!note"
          style="
            background-color: var(--ion-color-light);
            border-radius: 10px;
            padding: 5px;
            margin-top: 10px;
            min-height: 70px;
          "
        >
          <h6></h6>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { brush, create } from "ionicons/icons";
const t = window.t;
</script>
