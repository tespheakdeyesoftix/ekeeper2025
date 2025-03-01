<template>
  <ion-card class="ion-no-margin ion-margin-bottom" style="border-radius: 20px">
    <ion-card-header>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: gray;
          border-radius: 20px;
          margin: 0px;
          padding: 5px;
        "
      >
        <ion-card-subtitle class="ion-no-margin" style="color: #ffffff"
          >Guest Name</ion-card-subtitle
        >
        <ion-card-subtitle
          class="ion-no-margin"
          style="
            background-color: green;
            color: #ffffff;
            border-radius: 20px;
            padding: 5px 10px;
          "
          >In House</ion-card-subtitle
        >
      </div>
    </ion-card-header>
    <ion-card-content
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <ion-text>
        <h6>{{ t("Pax") }}</h6>
        <h6>1/2</h6>
      </ion-text>
      <ion-text>
        <h6>{{ t("Arrival") }}</h6>
        <h6>05-02-2025 10:00</h6>
      </ion-text>
      <ion-text>
        <h6>{{ t("Departure") }}</h6>
        <h6>28-02-2025 10:00</h6>
      </ion-text>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
const t = window.t;
</script>
