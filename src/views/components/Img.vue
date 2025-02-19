<template>
    <div>
      xx
      <img v-if="imgData" :src="imgData" style="width:250px">
      <p v-else>Loading image...</p>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import { CapacitorHttp } from '@capacitor/core';

const imgUrl = "/files/profilea8a357.jpg&width=150";
const imgData = ref(null);

const getImage = async (url) => {
  try {
    const response = await CapacitorHttp.request({
      method: 'GET',
      url: "http://webmonitor.inccloudserver.com:1216/api/method/edoor.api.image_resizer.resize_image?image_path=/files/profilea8a357.jpg&width=3000"
    });

    if(response.status==200){
      console.log(response.data);
      imgData.value = response.data.message.image
    }
  } catch (err) {
    console.error("Error loading image:", err);
    return null;
  }
};

// Load the image when component is mounted
onMounted(async () => {
  getImage("xx")
});
</script>
