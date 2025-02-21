

<template>
    <ion-page>
        <AppBar>{{ t("Reports") }}</AppBar>
        <ion-page>
            <DocList docType="Work Order" :fields="['name','_assign']" :filters="[['_assign','like','%emp@mail.com%']]">
                <template v-slot:default="{ item }">
                <h3>{{ item.name }}</h3>  
                <p>{{ item._assign }}</p>
                </template>
            </DocList>
        </ion-page>
    </ion-page>
</template>
<script setup lang="ts">
const t = window.t;

</script>