<template>
  <ion-card>
    <ion-card-header color="primary" style="padding: 5px">
      <ion-card-title style="text-align: center">A 102</ion-card-title>
    </ion-card-header>

    <ion-card-content style="padding: 0px">
      <div style="padding: 5px">
        <ion-label>Pokémon Yel</ion-label>
        <div style="display: flex; align-items: center">
          <ion-icon :icon="bed"></ion-icon>
          <h6>1/2</h6>
        </div>
        <h6>Deposit Guest</h6>
      </div>
      <div style="border-top: 1px solid gray; padding: 5px; display: flex;  gap: 5px;">
        <ion-icon :icon="bed" style="background-color: red; padding: 5px; border-radius: 100%;"></ion-icon>
        <ion-icon :icon="bed" style="background-color: green; padding: 5px; border-radius: 100%;"></ion-icon>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { bed } from "ionicons/icons";
</script>

<style scoped></style>
