<template>
    <div>
      xx
      <img v-if="imageUrl" :src="imageUrl" style="width:250px">
      <p v-else>Loading image...</p>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import { CapacitorHttp } from '@capacitor/core';

const imgUrl = "http://192.168.10.19:1216/files/background.jpg";
const imageUrl = ref(null);

const getImage = async (url) => {
  try {
    const response = await CapacitorHttp.request({
      method: 'GET',
      url: url,
      responseType: "blob", // Get image as Blob
    
    });

    const blob = new Blob([response.data], { type: "image/jpeg" });
    return URL.createObjectURL(blob); // Convert blob to URL
  } catch (err) {
    console.error("Error loading image:", err);
    return null;
  }
};

// Load the image when component is mounted
onMounted(async () => {
  alert(123)
  imageUrl.value = await getImage(imgUrl);
});
</script>
