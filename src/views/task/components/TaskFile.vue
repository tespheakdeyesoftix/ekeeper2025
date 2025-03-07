<template>
  {{ docInfo?.name }} 
  <ion-card class="ion-no-margin ion-margin-top ion-padding" style="border-radius:12px; box-shadow: 0 4px 10px rgba(63, 38, 38, 0.12);">
    
    <ion-card-header>
      <ion-card-title style="font-weight: bold;">
        {{ t('Attached file') }}
        <ion-icon :icon="documentOutline" size="small" />
      </ion-card-title>
      <ion-card-subtitle class="ion-margin-top">Upload documents you want to share with your teamwork.</ion-card-subtitle>
    </ion-card-header>

    <!-- Drag & Drop Upload -->
    <div class="upload-box ion-text-center" @click="selectFile">
      <ion-icon size="large" :icon="cloudUploadOutline" />
      <p>Drag & Drop your files here</p>
      <p>OR</p>
      <ion-button fill="outline">Browse Files</ion-button>
      <input type="file" ref="fileInput" hidden @change="handleFileUpload" />
    </div>

    <!-- Uploaded Files -->
    <ion-card-content class="ion-no-padding ion-margin-top" v-if="attachments.length">
      <p style="font-weight: bold; font-size: 16px;">Uploaded files</p>
      
      <ion-card v-for="(file, index) in attachments" :key="index" class="ion-no-margin file-item"> 
        <ion-item lines="none" class="ion-no-padding">
          <ion-icon :icon="documentTextOutline" class="file-icon" slot="start" />

          <ion-label>
            <p class="file-name">{{ file.file_name }}</p>
            <!-- <ion-progress-bar v-if="file.progress !== null && file.progress < 100" :value="file.progress / 100" style="height: 2px;"></ion-progress-bar> -->
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
import { ref, watch } from "vue";
import { cloudUploadOutline, closeOutline, documentOutline,documentTextOutline } from "ionicons/icons";
import { uploadFile } from "@/services/api-service";

// Prop from parent
const t = window.t
const props = defineProps({
  docInfo: Object,
  doc: Object
});
console.log("docInfo:", props.docInfo);
console.log("doc:", props.doc);


// Reactive array to hold file attachments
const attachments = ref(props.docInfo?.attachments);
console.log('attachments',attachments);

 
const fileInput = ref(null);   
const selectFile = () => fileInput.value.click();

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const newFile = { 
      name: file.name, 
      file_name: file.name,
      file_url: URL.createObjectURL(file),
      is_private: 0,
      progress: 0,
    };
    
    console.log('newFile', newFile);
    attachments.value.push(newFile); 

    try {
      const docType = "";  
      const docname = "";  // ✅ Corrected
      const fieldname = ""; 
      const otherOptions = {
        file_url: newFile.file_url,  
      }; 
      
      console.log("Uploading file for docname:", docname); // ✅ Debugging

      const result = await uploadFile(docType, docname, fieldname, file, otherOptions, (completedBytes, totalBytes) => {
        const progress = Math.round((completedBytes / totalBytes) * 100); 
        const uploadedFile = attachments.value.find(f => f.name === file.name);
        if (uploadedFile) {
          uploadedFile.progress = progress; 
        }
      });

      console.log('Upload response:', result.data); 

      if (result.data) {
        const uploadedFile = attachments.value.find(f => f.name === file.name);
        if (uploadedFile) {
          uploadedFile.file_url = result.data; 
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
};
    

//     // Simulate the upload progress
//     let progressInterval = setInterval(() => {
//       const uploadedFile = attachments.value.find(f => f.name === file.name);   
//       if (uploadedFile && uploadedFile.progress < 100) {
//         uploadedFile.progress += 10;
//       } else { 
//         clearInterval(progressInterval);  
//         uploadFile()
//       }
//     }, 300);
//   }
// };

// Remove file from the list
const removeFile = (file) => {
  attachments.value = attachments.value.filter(f => f.name !== file.name);
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
