<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Task</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-img :src="imageUrl"  style="height: 350px; width: 250px" />
      <input type="file" accept="image/*" @change="handleFileUpload" />
      <ion-button @click="uploadImage">Upload Image</ion-button>
  </ion-content>
</template>
<script lang="ts" setup>
  import {ref} from "vue"
  import {uploadFile} from "@/services/api-service"
  const file = ref(null);
  const imageUrl = ref("");
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      file.value = selectedFile;
      imageUrl.value = URL.createObjectURL(selectedFile); // Preview the selected image
    }
};
  const uploadImage = async () => {
   
    if (!file.value) {
      window.showWarning("Please select file to upload")
    return;
  }else {
  
   await uploadFile(
      "Work Order",
      "WO2025-0001",
      "",
      file.value,
      {
        folder:"WorkOrder"
      }
    );
   

  }
}
</script>
<style scoped>
</style>
