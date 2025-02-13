<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Task Detail - {{ route.params.name }}</ion-title>
                <ion-buttons slot="end">
          <ion-button size="large"  shape="round">
            <ion-icon :icon="pencilOutline" />
         
          </ion-button>
        </ion-buttons>
           
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Loading v-if="loading"></Loading>
            <template v-else>
                this is task detail page
            {{ doc }}
            
            </template>
        </ion-content>
    </ion-page>

</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonContent,IonToolbar,IonButton,IonButtons,IonBackButton,IonTitle,IonHeader,IonIcon } from '@ionic/vue';
import { pencilOutline} from 'ionicons/icons';
import { useRoute } from 'vue-router';
import {getDoc} from "@/services/api-service";
const route = useRoute();
const name = ref("")
name.value = route.params.name || "";
const doc = ref()
const loading = ref(true);

async function getData(){
    loading.value =true
    const {data,error}= await getDoc("Work Order",name.value);
    if(!error){
        doc.value = data
    }
    loading.value = false;

}
onMounted(async ()=>{
    await getData();
})

</script>
