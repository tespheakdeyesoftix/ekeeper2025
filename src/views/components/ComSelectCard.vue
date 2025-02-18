<template>
    <ion-card :key="index" @click="onSelect" button>
     
        <ion-ripple-effect></ion-ripple-effect>
        <ion-card-header>
            <ion-avatar v-if="photoField">
                <img :src="imageUrl(data[photoField])" alt="Avatar" v-if="data[photoField]" />
                <div class="avatar-placeholder" :style="{ backgroundColor: getRandomColor() }" v-else>{{
                    getAvatarLetter(data[labelField] ?? data[valueField]) }}</div>

            </ion-avatar>

            <ion-card-title>{{ data[labelField] ?? data[valueField] }}</ion-card-title>
            <ion-card-subtitle v-if="description">{{ description }}</ion-card-subtitle>

            <ion-icon :icon="checkmarkCircle" v-if="data.selected" size="large" color="success" />

        </ion-card-header>
    </ion-card>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { imageUrl, getAvatarLetter, getRandomColor } from "@/helpers/utils"
import { checkmarkCircle } from "ionicons/icons"; // Import Ionicons


const props = defineProps({
    data: Object,
    valueField: {
        type: String,
        default: "name"
    },
    labelField: {
        type: String,
        default: "label"
    },
    descriptionField: {
        type: String,
        default: "description"
    },
    descriptionFields: String,
    photoField: String,
    selectedValue:String,
    selectedValues:Object

})
const emit = defineEmits();

 
const description = computed(() => {

    if (props.descriptionFields) {


        let values: any[] = [];
        props.descriptionFields.split(",").map((item: string) => item.trim()).forEach((f: string) => {
            if (props.data) {
                values.push(props.data[f])
            }
        });
        if (values) {
            return values.join(", ")
        }
    }
    if (props.descriptionField) {
        if (props.data) {
            return props.data[props.descriptionField];
        }


    }


    return "";
})

const onSelect = () => {
    emit("onSelect")

}
</script>

<style scoped>
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
</style>