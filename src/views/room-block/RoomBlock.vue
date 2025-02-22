<template>
    <ion-page>
        <AppBar>{{ t("Room Block") }}</AppBar>
    
        <ion-content :fullscreen="true" class="ion-padding">
            <DocList docType="Room Block">
                <template v-slot:default="{ item }">
                    <ComRoomBlockCard :data="item" @onClick="onClick"/>
                </template>
            </DocList>
    </ion-content>

    </ion-page>
    
</template>
<script lang="js" setup>
import ComRoomBlockCard from '@/views/room-block/components/ComRoomBlockCard.vue';
import { useIonRouter } from '@ionic/vue';
const t = window.t;
const ionRouter = useIonRouter();

function onClick(d){
    ionRouter.navigate('/room-block-detail/' + d.name, 'forward', 'push');
}
</script>