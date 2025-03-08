<template>
    <ion-card class="ion-no-margin ion-margin-top ion-padding custom-card">
        <h2>Task Images</h2> 
            <Img v-if="imgData" :src="imgData" class="task-image" /> 
            <ion-button expand="block" @click="handleuploadImage" class="upload-btn">Upload Picture</ion-button>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  import { uploadFile } from '@/services/api-service';
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Img from '@/views/components/Img.vue';
  
  const props = defineProps({
    doc: Object,
  });
  
  const imgData = ref(props.doc?.photo);
  
  const handleuploadImage = async () => {
    try {
      const pickImage = await Camera.pickImages({
        quality: 90,
        limit: 1,
      });
  
      if (pickImage?.photos.length > 0) {
        const firstPhoto = pickImage.photos[0].webPath;
        imgData.value = firstPhoto;
  
        const response = await fetch(firstPhoto);
        const blob = await response.blob();
  
        const uploadResponse = await uploadFile('Work Order', props.doc?.name, 'photo', blob, {});
        console.log('uploadResponse', uploadResponse);
  
        if (uploadResponse.data) {
          imgData.value = uploadResponse.data;
          alert('Upload successful');
        } else {
          alert('Upload failed');
        }
      }
    } catch (error) {
      alert('Error uploading image');
      console.error(error);
    }
  };
  </script>
  
  <style scoped>
  .custom-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  
  .task-image {
    width: 100%;
    max-width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 12px;
  }
  
  .upload-btn {
    /* width: 100%; */
    font-size: 1rem;
    font-weight: 600; 
  }
  </style>
  