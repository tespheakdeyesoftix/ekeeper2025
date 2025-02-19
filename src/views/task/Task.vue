<template>
  <ion-page>
<AppBar>Task</AppBar>
<ion-content class="ion-pading">
   
  <ion-segment v-model="selectedTab" @ionSelect="loadData">
    <ion-segment-button value="first" content-id="first">
      <ion-label>First</ion-label>
    </ion-segment-button>
    <ion-segment-button value="second" content-id="second">
      <ion-label>Second</ion-label>
    </ion-segment-button>
    <ion-segment-button value="third" content-id="third">
      <ion-label>Third</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment-view>
    <ion-segment-content id="first">
      <div v-if="firstTabData">First Tab Data: {{ firstTabData }}</div>
      <div v-else>Loading First Tab Data...</div>
    </ion-segment-content>
    <ion-segment-content id="second">
      <div v-if="secondTabData">Second Tab Data: {{ secondTabData }}</div>
      <div v-else>Loading Second Tab Data...</div>
    </ion-segment-content>
    <ion-segment-content id="third">
      <div v-if="thirdTabData">Third Tab Data: {{ thirdTabData }}</div>
      <div v-else>Loading Third Tab Data...</div>
    </ion-segment-content>
  </ion-segment-view>
</ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/vue';
import Img from "@/views/components/Img.vue"
export default defineComponent({
  components: { IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView },
  setup() {
    const selectedTab = ref('first');
    const firstTabData = ref(null);
    const secondTabData = ref(null);
    const thirdTabData = ref(null);

    const loadData = () => {
      if (selectedTab.value === 'first' && !firstTabData.value) {
        // Simulate data load for the first tab (e.g., fetch from API)
        setTimeout(() => {
          firstTabData.value = 'Data for First Tab';
        }, 1000);
      } else if (selectedTab.value === 'second' && !secondTabData.value) {
        // Simulate data load for the second tab
        setTimeout(() => {
          secondTabData.value = 'Data for Second Tab';
        }, 1000);
      } else if (selectedTab.value === 'third' && !thirdTabData.value) {
        // Simulate data load for the third tab
        setTimeout(() => {
          thirdTabData.value = 'Data for Third Tab';
        }, 1000);
      }
    };

    return { selectedTab, firstTabData, secondTabData, thirdTabData, loadData };
  },
});
</script>

<style>
  ion-segment-view {
    height: 150px;
  }

  ion-segment-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ion-segment-content:nth-of-type(1) {
    background: lightpink;
  }
  ion-segment-content:nth-of-type(2) {
    background: lightblue;
  }
  ion-segment-content:nth-of-type(3) {
    background: lightgreen;
  }
</style>
