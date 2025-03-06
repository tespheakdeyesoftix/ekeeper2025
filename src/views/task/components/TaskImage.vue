<template>
    <ion-card class="ion-no-margin ion-margin-top">
      <Img :src="imgData"  />
      <ion-button @click="handleuploadImage">Upload pic</ion-button> 
    </ion-card>
  </template>
  
  <script setup lang="ts">
    import { defineProps, ref,defineEmits  } from 'vue';
    import { uploadFile } from '@/services/api-service'; // Assuming the uploadFile function is defined here
    import Img from '@/views/components/Img.vue';
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Import Capacitor Camera API

    
    const props = defineProps({
    doc: Object
  });
  const emit = defineEmits(['update:doc'])
  
    
const imgData = ref(props.doc?.photo)  
const handleuploadImage = async () => {   
    try{
        const pickImage = await Camera.pickImages({
            quality: 90,
            limit:1

        });
    
        if (pickImage?.photos.length > 0){ 
            const firstPhoto = pickImage.photos[0].webPath ; 
            imgData.value = firstPhoto;   
            const response = await fetch(firstPhoto)
            const blob = await response.blob()

            const uploadResponse = await uploadFile('Work Order', props.doc?.name, 'photo', blob, {})
            console.log('uploadResponse',uploadResponse);
            
            if(uploadResponse.data){
                imgData.value = uploadResponse.data
                emit('update:doc', {...props.doc, photo: uploadResponse.data})
                alert('done')
            }else{
                alert('failed')
            }  
        }
    }catch(error){
        alert('error')
        console.error(error);
    }
}

  </script>
  