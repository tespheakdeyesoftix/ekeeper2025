<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-text color="primary">
                <h1>Select Workspace</h1>
                <ion-button router-link="/add-workspace">Add Workspace</ion-button>
            </ion-text>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent ,IonButton} from '@ionic/vue';

</script>