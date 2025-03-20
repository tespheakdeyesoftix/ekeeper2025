<template>
  <div style="margin: 0px 5px">
    <!-- Stay Guest -->
    <ion-card class="ion-no-border ion-no-margin ion-margin-bottom">
      <ion-card-content>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h3 style="font-weight: bold">{{ t("Stay Guest") }}</h3>
          <ion-button fill="clear" class="ion-no-margin ion-no-padding">
            <ion-icon :icon="ellipsisHorizontal"></ion-icon>
          </ion-button>
        </div>
        <div style="display: flex; align-items: center">
          <div>
            <template v-if="data?.photo">
              <ion-avatar style="width: 60px; height: 60px">
                <Img :src="data.photo" />
              </ion-avatar>
            </template>
            <template v-else>
              <ion-avatar
                class="avatar-placeholder"
                :style="{ backgroundColor: getRandomColor() }"
                >{{ getAvatarLetter("sdef") }}</ion-avatar
              >
            </template>
          </div>
          <div class="ion-margin-start">
            <h6 style="font-weight: bold" class="truncate">Heng</h6>
            <h6>01255636361</h6>
            <h6>helo@gmail.com</h6>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
    <!-- Stay Information -->
    <ion-card class="ion-no-border ion-no-margin ion-margin-bottom">
      <ion-card-content>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h3 style="font-weight: bold">{{ t("Stay Information") }}</h3>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <h6>Color Code</h6>
            <div
              :style="{
                height: '20px',
                width: '20px',
                borderRadius: '5px',
                marginLeft: '5px',
                backgroundColor: 'red',
              }"
            ></div>
          </div>
        </div>
        <div class="">
          <ion-list>
            <ion-item>
              <h6>{{ t("Res Stay. No : ") }}</h6>
            </ion-item>
            <ion-item>
              <h6>{{ t("Rate Type : ") }}</h6>
            </ion-item>
            <ion-item>
              <ion-grid class="ion-no-padding">
                <ion-row>
                  <ion-col size="7" class="flex">
                    <h6>{{ t("Arrival : ") }}</h6>
                  </ion-col>
                  <ion-col size="5" class="flex">
                    <h6>{{ t("Time : ") }}</h6>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <ion-item>
              <ion-grid class="ion-no-padding">
                <ion-row>
                  <ion-col size="7" class="flex">
                    <h6>{{ t("Departure : ") }}</h6>
                  </ion-col>
                  <ion-col size="5" class="flex">
                    <h6>{{ t("Time : ") }}</h6>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <ion-item>
              <h6>{{ t("Nights : ") }}</h6>
            </ion-item>
            <ion-item>
              <h6>{{ t("Room(s) : ") }}</h6>
            </ion-item>
            <ion-item>
              <ion-grid class="ion-no-padding">
                <ion-row>
                  <ion-col size="7" class="flex">
                    <h6>{{ t("Adults : ") }}</h6>
                  </ion-col>
                  <ion-col size="5" class="flex">
                    <h6>{{ t("Childs : ") }}</h6>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-list>
        </div>
        <!-- Note -->
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
            v-if="note"
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
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { ellipsisHorizontal, create } from "ionicons/icons";
import { getAvatarLetter, getRandomColor } from "@/helpers/utils";
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
}
</style>
