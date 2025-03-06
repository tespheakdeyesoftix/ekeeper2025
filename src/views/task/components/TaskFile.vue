<template>
  <ion-card class="ion-no-margin ion-margin-top ion-padding" style="border-radius:12px">
      <ion-card-header>
          <ion-card-title class="upload-title">Attached file</ion-card-title>
          <ion-card-subtile class="ion-margin-top" >Upload documents you want to share with your team.</ion-card-subtile>
      </ion-card-header>

      <div class="upload-box ion-text-center" @click="selectFile">
          <ion-icon :icon="cloudUploadOutline" class="upload-icon" />
          <p>Drag & Drop your files here</p>
          <p>OR</p>
          <ion-button  fill="outline">Browse Files</ion-button>
          <input type="file" ref="fileInput" hidden @change="handleFileUpload" />
        </div>

      <ion-card-content class="ion-no-padding ion-margin-top ion-text-center" v-if="uploadedFiles.length">
          <p class="file-header">Uploaded files</p>
          <ion-card v-for="(file, index) in uploadedFiles" :key="index"  class="ion-no-margin ion-margin-top file-item" style="border-radius:10px">
              <ion-icon :icon="file.icon" class="file-icon" :class="file.color" />
              <ion-card-content class="file-details">
                  <p class="file-name">{{ file.name }}</p>
                  <ion-progress-bar :value="file.progress / 100" :color="file.color"></ion-progress-bar>
              </ion-card-content>
              <ion-icon :icon="closeOutline" class="remove-icon" @click="removeFile(file)" />

          </ion-card>
      </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cloudUploadOutline, closeOutline, documentTextOutline } from "ionicons/icons";

const fileInput = ref(null);
const uploadedFiles = ref([
{ name: "Dribbble CV_23/09.pdf", progress: 64, icon: documentTextOutline, color: "primary" },
{ name: "Portfolio Template.pdf", progress: 96, icon: documentTextOutline, color: "primary" },
{ name: "General Information.txt", progress: 100, icon: documentTextOutline, color: "success" }
]);

const selectFile = () => fileInput.value.click();
const handleFileUpload = (event) => {
const file = event.target.files[0];
if (file) {
  uploadedFiles.value.push({
    name: file.name,
    progress: 0,
    icon: documentTextOutline,
    color: "primary"
  });

  // Simulate upload progress
  let progressInterval = setInterval(() => {
    let uploadedFile = uploadedFiles.value.find(f => f.name === file.name);
    if (uploadedFile.progress < 100) {
      uploadedFile.progress += 10;
    } else {
      clearInterval(progressInterval);
    }
  }, 300);
}
};

const removeFile = (file) => {
uploadedFiles.value = uploadedFiles.value.filter(f => f.name !== file.name);
};
</script>

<style scoped> 
p {
  margin: 5px 0;
}

.upload-card {
max-width: 400px;
margin: auto;
padding: 20px;
text-align: center;
}

.upload-title {
font-size: 18px;
font-weight: bold; 
}

.upload-subtitle {
font-size: 14px;
color: gray;
}

.upload-box {
border: 2px dashed #ccc;
padding: 20px;
border-radius: 10px;
cursor: pointer;
}

.upload-icon {
font-size: 40px;
color: gray;
} 

.file-header {
font-weight: bold;
font-size: 16px;
}

.file-item {
display: flex;
align-items: center;
background: #f9f9f9;
padding: 10px;
border-radius: 8px;
margin-bottom: 10px;
}

.file-icon {
font-size: 24px;
margin-right: 10px;
}

.file-details {
flex: 1;
}

.file-name {
font-size: 14px;
}

.progress-bar {
height: 4px;
background: #ddd;
border-radius: 4px;
width: 100%;
margin-top: 5px;
}

.progress-fill {
height: 100%;
border-radius: 4px;
}

.blue-fill {
background: #4a90e2;
}

.green-fill {
background: #34c759;
}

.remove-icon {
font-size: 20px;
cursor: pointer;
color: gray;
}
</style>