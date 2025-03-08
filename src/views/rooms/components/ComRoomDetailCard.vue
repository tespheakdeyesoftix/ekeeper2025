<template>
  <ion-card class="ion-no-margin ion-margin-bottom" style="border-radius: 10px">
    <ion-card-header style="padding-bottom: 0px">
      <ion-card-title>{{ t("Guest Information") }}</ion-card-title>
    </ion-card-header>
    <ion-card-content class="ion-no-padding">
      <ion-list class="ion-no-padding">
        <ion-card class="ion-no-border">
          <ion-item style="background-color: var(--ion-color-light-shade)">
            <ion-thumbnail slot="start">
              <Img
                src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
              />
            </ion-thumbnail>
            <div style="width: 100%; padding: 5px">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <h6 style="font-weight: bold">Rathana</h6>
                <h6
                  style="
                    border-radius: 10px;
                    padding: 3px 5px;
                    background-color: green;
                    color: var(--ion-color-light);
                  "
                >
                  In-House
                </h6>
              </div>
              <h6>+855 2515225</h6>
              <h6>rathana@gmail.com</h6>
            </div>
          </ion-item>
          <div style="display: flex; align-items: center; padding: 5px">
            <ion-icon
              :icon="airplane"
              style="margin: 0px 0px 2px 0px; transform: rotate(45deg)"
            ></ion-icon>
            <h6>10 Mar 10:00AM</h6>
            <ion-icon
              :icon="airplane"
              style="margin: 0px 0px 2px 5px; transform: rotate(-45deg)"
            ></ion-icon>
            <h6>12 Mar 10:00AM</h6>
            <ion-icon :icon="bed" style="margin: 0px 0px 2px 5px"></ion-icon>
            <h6>2/1</h6>
          </div>
        </ion-card>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { bed, airplane } from "ionicons/icons";
const t = window.t;
</script>
