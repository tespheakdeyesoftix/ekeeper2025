<template>
    <ion-card class="dashboard-card">
      <ion-card-content>
        <ion-grid>
          <ion-row class="card-container">
            <!-- Greeting Section -->
            <ion-col size="6">
              <ion-text>
                <h2 class="greeting-text">{{ t(getGreetingMessage()) }} <br /> {{ currentUser.full_name }}</h2>
                <p style="margin-top: 5px">{{ t("Welcome to your workspace.") }}</p>
              </ion-text>
            </ion-col>
  
            <!-- Date Box Section -->
            <ion-col size="6" class="date-box-col">
              <div class="date-box">
                <ion-text>
                  <h3>{{ t(dayjs(currentWorkingDate).format("dddd")) }}</h3>
                  <h1>{{ dayjs(currentWorkingDate).format("DD") }}</h1>
                  <h3>{{ t(dayjs(currentWorkingDate).format("MMMM")) }}, {{ dayjs(currentWorkingDate).format("YYYY") }}</h3>
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
  import { getGreetingMessage } from "@/helpers/utils";
  import dayjs from 'dayjs';
  import { useApp } from '@/hooks/useApp';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n();
  const { currentUser } = useAuth();
  const { currentWorkingDate } = useApp();
  </script>
  
  <style scoped>
  .dashboard-card {
    border-radius: 15px;
    background: rgb(230, 245, 254);
    padding: 0px;
    margin: 10px;
  }
  
  ion-card-content {
    padding: 5px;
  }
  
  .greeting-text {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0px;
  }
  
  .date-box {
    text-align: center;
    background: rgba(193, 195, 224, 0.309); /* Transparent white */
    padding: 10px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    display: inline-block; 
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
  
  /* Space Between the columns */
  .card-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  /* Ensure the Date Box stays on the right */
  .date-box-col {
    display: flex;
    justify-content: flex-end; /* Ensures the Date Box is right aligned */
  }
  </style>
  