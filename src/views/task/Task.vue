<template>

    <ion-page>
        <AppBar>Task</AppBar>
        <ion-content>
                <h1>This task page</h1>
                <ion-button router-link="/task-detail/WO2025-0001">Open Task Detail</ion-button>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent,IonButton } from '@ionic/vue';
</script>
