<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
alert(import.meta.env.VITE_API_URL);
alert(import.meta.env.VITE_SUPABASE_API_URL)
</script>
