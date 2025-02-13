<template>
<ion-card class="dashboard-card">
    <ion-card-content>
        <ion-grid>
            <ion-row class="align-items-center">
                <!-- Greeting Section -->
                <ion-col>
                    <ion-text>
                        <h2 class="greeting-text">{{ getGreetingMessage() }} <br/> {{ currentUser.full_name }}</h2>
                        <p>Welcome to your workspace.</p>
                    </ion-text>
                </ion-col>

                <!-- Date Box Section -->
                <ion-col size="auto">
                    <div class="date-box">
                        <ion-text>
                            <h3>{{ dayjs(currentWorkingDate).format("dddd") }}</h3>
                            <h1>{{ dayjs(currentWorkingDate).format("DD") }}</h1>
                            <h3>{{ dayjs(currentWorkingDate).format("MMMM") }}, {{ dayjs(currentWorkingDate).format("YYYY") }}</h3>
                        </ion-text>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-card-content>
</ion-card>





</template>
<script setup lang="ts">

import { useAuth } from '@/hooks/useAuth';
import { IonText, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { getGreetingMessage } from "@/helpers/utils"
import dayjs from 'dayjs';
import { useApp } from '@/hooks/useApp';
const { currentUser } = useAuth()
const { currentWorkingDate } = useApp();

</script>

<style scoped>
.dashboard-card {
    border-radius: 15px;
    background: rgb(230, 245, 254);
   
 
}

.greeting-text {
    font-size: 1.4rem;
    font-weight: bold;
}

.date-box {
    text-align: center;
    background: rgba(193, 195, 224, 0.309); /* Transparent white */
    padding: 10px 20px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    display: inline-block;
    min-width: 100px;
}

.date-box h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 5px 0;
}

.date-box h3 {
    font-size: 1.2rem;
    margin: 0;
}

</style>