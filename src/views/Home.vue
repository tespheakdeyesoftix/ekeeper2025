<template>
       <ion-page>
      <ion-content :fullscreen="true">
  <ComWelcome/>
        <ion-text>
          <ion-button expand="full"   shape="round" router-link="/room" >Add Workspace</ion-button>
          <p>xxxxxxxxHello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
          <p>Hello workd this is my rand tom text</p>
            <ion-button @click="onLogout">Logout</ion-button>
        </ion-text>
    </ion-content>
  </ion-page>
  </template>
  
  <script setup lang="ts">
  import {ref} from "vue"
  import {IonMenuButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonText,IonButton,useIonRouter } from '@ionic/vue';

  import { useHome } from "@/hooks/useHome";
import ComWelcome from "@/views/home/components/ComWelcome.vue"
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
  