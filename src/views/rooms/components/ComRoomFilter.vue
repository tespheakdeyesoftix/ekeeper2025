<template>
    <div>
        <div class="scroll-container">
            <!-- Date -->
            <!-- <ion-chip style="padding: 0px;background-color: transparent;"> -->
                <ion-datetime-button datetime="datetime" ></ion-datetime-button>
            <ion-chip v-for="(item, index) in date" :key="index" expand="block" @click="setOpen(true)">
                {{ item.label }}
            </ion-chip>
        </div>
        <!-- Date Picker -->
        <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" presentation="date" :value="selectedDate" :format-options="formatOptions"
                :show-default-buttons="true"></ion-datetime>
        </ion-modal>

        <ion-modal ref="modal" :is-open="isOpen" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]"
            @ionModalDidDismiss="setOpen(false)">
            <ion-content class="ion-padding">
                <ion-searchbar @click="$refs.modal.$el.setCurrentBreakpoint(0.75)" placeholder="Search"></ion-searchbar>
                <ion-list>
                    <ion-item>
                        <ion-avatar slot="start">
                            <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
                        </ion-avatar>
                        <ion-label>
                            <h2>Connor Smith</h2>
                            <p>Sales Rep</p>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-avatar slot="start">
                            <ion-img src="https://i.pravatar.cc/300?u=a"></ion-img>
                        </ion-avatar>
                        <ion-label>
                            <h2>Daniel Smith</h2>
                            <p>Product Designer</p>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-modal>
    </div>
</template>

<script setup lang="ts">
import {
    IonChip, IonModal, IonContent,
    IonList, IonItem, IonAvatar,
    IonImg, IonLabel, IonSearchbar, IonDatetime, IonDatetimeButton, IonIcon 
} from '@ionic/vue';
import {  closeCircle  } from 'ionicons/icons';

import { ref } from 'vue';
import { defineComponent } from 'vue';
import { useApp } from "@/hooks/useApp";
const { currentWorkingDate } = useApp()
const isOpen = ref(false);
const selectedDate = ref(currentWorkingDate)
const setOpen = (open: boolean) => {
    isOpen.value = open;
};
const date = ref([
    { label: 'Housekeeping Status' },
    { label: 'hello' },
    { label: 'hello' },
    { label: 'hello' },
    { label: 'hello' },
    { label: 'hello' },
    { label: 'hello' },
    { label: 'hello' },
    { label: 'hello' },
]);
const formatOptions = {
    date: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    },
};
</script>

<style scoped>
.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px;
}

.scroll-container::-webkit-scrollbar {
    display: none;
}
</style>
