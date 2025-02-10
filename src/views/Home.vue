<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Home</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ion-text>
            This is home page
            {{ ctrl.data }}

            {{ currentProperty }}
            <hr>
            {{ currentWorkingDate }}
            <hr>
            {{ data }}
            <ion-button @click="getData">Click me</ion-button>
            <ion-button @click="onLogout">Logout</ion-button>
        </ion-text>
    </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import {ref} from "vue"
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonText,IonButton,useIonRouter } from '@ionic/vue';

  import { useHome } from "@/hooks/useHome";

  import {getDocList,getApi} from "@/services/api-service"
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/hooks/useApp';

const ionRouter = useIonRouter();
  const ctrl = useHome()
const {currentProperty,currentWorkingDate} = useApp()

const data = ref()
  const {logout} = useAuth()
  
  function onLogout(){
    logout();
    ionRouter.navigate('/select-workspace', 'back', 'replace');

  }
  async function getData(){
   
    // const result =await getDocList("Customer");
    const result = await getApi("edoor.mobile_api.housekeeping.api.get_dashboard_data",{
      property:currentProperty.value.property_name,
      working_date:currentWorkingDate.value

    })
    data.value = result.data
  }
  


  </script>
  