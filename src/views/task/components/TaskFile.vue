<template>
  <ion-card class="ion-no-margin ion-margin-top ion-padding" style="border-radius:12px;  box-shadow: 0 4px 10px rgba(63, 38, 38, 0.12);">
    
    <ion-card-header>
      <ion-card-title style="font-weight: bold;">
        {{ t('Attached file') }}
        <ion-icon :icon="documentOutline" size="small" />
      </ion-card-title>
      <ion-card-subtile class="ion-margin-top">Upload documents you want to share with your teamwork.</ion-card-subtile>
    </ion-card-header>

    <div class="upload-box ion-text-center" @click="selectFile">
      <ion-icon size="large" :icon="cloudUploadOutline" />
      <p>Drag & Drop your files here</p>
      <p>OR</p>
      <ion-button fill="outline">Browse Files</ion-button>
      <input type="file" ref="fileInput" hidden @change="handleFileUpload" />
    </div>

    <!-- Drop file here -->
    <ion-card-content class="ion-no-padding ion-margin-top" v-if="uploadedFiles.length">
      <p style="font-weight: bold; font-size: 16px;">Uploaded files</p>
      <ion-card v-for="(file, index) in uploadedFiles" :key="index" class="ion-no-margin  file-item" >
        <ion-item lines="none" class="ion-no-padding ">
          <ion-icon :icon="file.icon" class="file-icon" :class="file.color" slot="start" />
          <ion-label >
            <p class="file-name">{{ file.name }}</p>
            <ion-progress-bar :value="file.progress / 100" style="height: 2px;" color="success"></ion-progress-bar>
          </ion-label>
          <ion-button fill="clear" slot="end" @click="removeFile(file)">
            <ion-icon :icon="closeOutline" class="remove-icon" color="danger" /> 
          </ion-button>
        </ion-item>

      </ion-card>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cloudUploadOutline, closeOutline, documentTextOutline, documentAttachOutline, documentOutline } from "ionicons/icons";

const t = window.t

const fileInput = ref(null);
const uploadedFiles = ref([
  { name: "Dribbble CV_23/09Dribbble CV_23/0909Dribbble CV_23/0909Dribbble CV_23/0909Dribbble CV_23/0909Dribbble CV_23/09.pdf", progress: 64, icon: documentTextOutline, color: "primary" },
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

/* ion-progress-bar {
  width: 100%;
} */
ion-item{
  --inner-padding-end: 0px;  
}

p {
  margin: 5px 0;
} 

.upload-box {
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}  

.file-item {
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
}

.file-icon {
  font-size: 24px;
  margin-right: 10px;
}


.file-name {
  font-size: 16px;
  margin: 0; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}     

.remove-icon { 
  cursor: pointer; 
}
</style>