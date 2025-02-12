<template>
  <ion-buttons slot="end" @click="openPopover($event)">

    <ion-avatar class="small-avatar">

      <img v-if="currentUser.photo" :src="imageUrl(currentUser.photo)" :alt="currentUser.full_name" />
      <div class="avatar-placeholder" v-else>{{ getAvatarLetter(currentUser.full_name) }}</div>

    </ion-avatar>
  </ion-buttons>

  <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen = false">
    <ion-content class="ion-padding">
      <div class="user-info">
        <ion-avatar>
          <img v-if="currentUser.photo" :src="imageUrl(currentUser.photo)" :alt="currentUser.full_name" />
          <div class="avatar-placeholder" v-else>{{ getAvatarLetter(currentUser.full_name) }}</div>

        </ion-avatar>
        <div class="username-position">
          <strong>Administrator</strong><br />
          <span>FO Manager</span>
          <ion-icon :icon="logoIonic"></ion-icon>
        </div>
      </div>

      <ion-list>
        <ion-item button detail="false" router-link="/my-profile" @click="popoverOpen = false">
          <ion-icon slot="start" :icon="personOutline"></ion-icon>
          <span>My Profile</span>
        </ion-item>
        <ion-item button detail="false" router-link="/help" @click="popoverOpen = false">
          <ion-icon slot="start" :icon="helpCircleOutline"></ion-icon>
          <span>Help</span>
        </ion-item>
        <ion-item button detail="false" lines="none" color="danger" @click="onLogout">
          <ion-icon slot="start" :icon="logOutOutline" class="logout-icon"></ion-icon>
          <span>Logout</span>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>


</template>
<script setup lang="ts">
import { IonButton, IonRippleEffect, IonPopover, IonIcon, IonList, IonItem, useIonRouter } from '@ionic/vue';
import { ref } from 'vue'
import { imageUrl, getAvatarLetter } from "@/helpers/utils"
import { useAuth } from "@/hooks/useAuth"

import { personOutline, helpCircleOutline, logOutOutline } from 'ionicons/icons';
const { logout } = useAuth()
const ionRouter = useIonRouter();
const { currentUser } = useAuth();
const popoverOpen = ref(false)
const event = ref<Event | null>(null);
function openPopover(e: Event) {
  event.value = e;
  popoverOpen.value = true;
}

 

const onLogout = async () => {
  popoverOpen.value = false;
  await logout();
  ionRouter.navigate('/select-workspace', 'back', 'replace');
};


</script>
<style scoped>
/* Avatar container */
.small-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  /* Light gray background */
}

/* Ensures the image fits properly */
.small-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Placeholder styling when no image */
.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  /* Blue background */
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  text-transform: uppercase;
}


/* Style the user info section */
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-info ion-avatar {
  margin-right: 10px;
}

.username-position {
  font-size: 14px;
}

.username-position strong {
  font-size: 16px;
  font-weight: bold;
}

.username-position span {
  color: var(--ion-color-medium);
}

/* Style the list of items */
ion-item {
  padding: 5px 0;
}



ion-item span {
  font-size: 14px;
}

.logout-item {
  border-radius: 50px;
  /* Make the item rounded */
  padding: 10px 15px;
  /* Add padding to create a larger clickable area */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
