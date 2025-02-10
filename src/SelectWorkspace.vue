<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-text color="primary">
        <h1>Select Workspace</h1>
        <ion-button router-link="/add-workspace">Add Workspace</ion-button>



        <ion-card v-for="(p, index) in properties" :key="index" >

          <ion-card-header>
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img :src="imageUrl(p.photo, p.api_url)" :alt="p.property_name" />
              </ion-avatar>
              <ion-label>
                <ion-card-title>{{ p.property_name }}</ion-card-title>
                <ion-card-subtitle>{{ p.property_code }}</ion-card-subtitle>
              </ion-label>
<ion-button @click="onLogin(p)">Login</ion-button>
              <ion-icon :icon="ellipsisVertical" color="primary" @click="onEdit(p)"></ion-icon>
            </ion-item>
          </ion-card-header>
        </ion-card>


      </ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, 
  IonContent, 
  IonButton, 
  IonCard, 
  IonCardHeader,
  IonCardSubtitle,
   IonIcon, 
   actionSheetController, 
   alertController,
  useIonRouter,
  loadingController
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { imageUrl } from '@/helpers/utils';
import { ellipsisVertical, logoIonic } from 'ionicons/icons';
import { useAuth } from './hooks/useAuth';
import { useApp } from './hooks/useApp';
import { setFrappeAppUrl } from '@/services/api-service';
const {currentProperty} = useApp()
const ionRouter = useIonRouter();
const properties = ref([]);
const { login } = useAuth()
async function onLogin(p: any) {
  const loading = await loadingController.create({
    message: 'Login...',
  });
  await loading.present();
  const response = await login(p);

  await loading.dismiss()
  if(response.data){
    setFrappeAppUrl(p.api_url);
    currentProperty.value = p;
      ionRouter.navigate('/home', 'forward', 'replace');
     
  }
  
}

async function onEdit(p: any) {
  const actionSheet = await actionSheetController.create({
    header: 'Action Menu',
    buttons: [
      {
        text: 'Edit',
        handler: async () => {
          ionRouter.navigate('/add-workspace/' + p.property_code, 'forward', 'push');

        }
      },
      {
        text: 'Remove Property',

        handler: async () => {

          const alert = await alertController.create({
            header: 'Delete property',
            message: 'Are you sure you want to delete this property?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                text: 'OK',
                cssClass: 'alert-button-confirm',
              }
            ]
          });

          await alert.present();
          const result = await alert.onWillDismiss();
          if (result.role != "cancel") {
            properties.value = properties.value.filter((r: any) => r.property_code != p.property_code)
            window.storageService.setItem("properties", JSON.stringify(properties.value))
          }



        }
      },


    ],
  });

  await actionSheet.present();
}

onMounted(() => {
  const strProperties = window.storageService.getItem("properties");
  if (strProperties) {
    properties.value = JSON.parse(strProperties)
  }
})

</script>

<style>
button.alert-button.alert-button-confirm {
  background-color: var(--ion-color-danger);
  color: var(--ion-color-danger-contrast);
}

.md button.alert-button.alert-button-confirm {
  border-radius: 4px;
}
</style>