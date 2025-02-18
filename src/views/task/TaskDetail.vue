<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Task Detail</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
  
        <!-- Task Header with Title, Status, and Description -->
        <ion-card class="task-header">
          <ion-card-header>
            <ion-card-title>{{ taskTitle }}</ion-card-title>
            <ion-chip color="primary" class="status-chip">
              <ion-label>{{ taskStatus }}</ion-label>
            </ion-chip>
          </ion-card-header>
          <ion-card-content>
            <p class="task-description">{{ taskDescription }}</p>
          </ion-card-content>
        </ion-card>
  
        <!-- Task Info (Dates, Location) with Icons -->
        <ion-card class="task-meta">
  <ion-card-header>
    <ion-card-title>Task Info</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <div class="task-meta-item">
      <ion-icon name="calendar" size="small"></ion-icon>
      <span>{{ postingDate }}</span>
    </div>
    <div class="task-meta-item">
      <ion-icon name="time" size="small"></ion-icon>
      <span>{{ dueDate }}</span>
    </div>
    <div class="task-meta-item">
      <ion-icon name="location" size="small"></ion-icon>
      <span>{{ location }}</span>
    </div>
    <div class="task-meta-item">
      <ion-icon name="checkbox" size="small"></ion-icon>
      <span>Status: {{ taskStatus }}</span>
    </div>
  </ion-card-content>
</ion-card>

  
        <!-- Assignees Section with Avatars -->
        <ion-card class="assignees">
          <ion-card-header>
            <ion-card-title>Assignees</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="assignee-avatars">
              <ion-avatar v-for="(assignee, index) in assignees" :key="index">
                <img :src="assignee.avatar" />
              </ion-avatar>
            </div>
          </ion-card-content>
        </ion-card>
  
        <!-- Activity (Audit & Comments) Modal -->
        <ion-card class="activity">
          <ion-card-header>
            <ion-card-title>Activity</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="full" @click="openActivityModal">
              View Activity (Comments & Audit)
            </ion-button>
          </ion-card-content>
        </ion-card>
  
        <!-- Files Section (Readonly) -->
        <ion-card class="files">
          <ion-card-header>
            <ion-card-title>Files</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="full" :disabled="true" color="medium">View Files</ion-button>
          </ion-card-content>
        </ion-card>
  
        <!-- Floating Action Button (FAB) for Edit -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button color="primary" @click="editTask">
            <ion-icon name="create"></ion-icon>
          </ion-fab-button>
        </ion-fab>
  
        <!-- Modal for Activity -->
        <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="closeActivityModal">
          <ion-header>
            <ion-toolbar>
              <ion-title>Activity</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="closeActivityModal">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <!-- Comments Section -->
            <ion-list>
              <ion-item v-for="(comment, index) in comments" :key="index">
                <ion-avatar slot="start">
                  <img :src="comment.authorAvatar" />
                </ion-avatar>
                <ion-label>
                  <h3>{{ comment.author }}</h3>
                  <p>{{ comment.text }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
  
            <!-- Audit Trail Section -->
            <div class="audit-trail">
              <h3>Audit Trail</h3>
              <p>{{ auditTrail }}</p>
            </div>
          </ion-content>
        </ion-modal>
  
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const taskTitle = ref('New Task Title');
  const taskDescription = ref('This task requires some detailed description.');
  const taskStatus = ref('In Progress');  // "In Progress", "Completed", etc.
  const postingDate = ref('2025-02-18');
  const dueDate = ref('2025-02-20');
  const location = ref('Room 101');
  const assignees = ref([
    { name: 'User 1', avatar: 'https://placeimg.com/50/50/people' },
    { name: 'User 2', avatar: 'https://placeimg.com/50/50/people' }
  ]);
  const comments = ref([
    { author: 'User 1', text: 'This task is in progress.', authorAvatar: 'https://placeimg.com/50/50/people' },
    { author: 'User 2', text: 'Pending review.', authorAvatar: 'https://placeimg.com/50/50/people' }
  ]);
  const auditTrail = ref('Created on 2025-02-17 by User 1.');
  const isModalOpen = ref(false);
  
  const openActivityModal = () => {
    isModalOpen.value = true;
  };
  
  const closeActivityModal = () => {
    isModalOpen.value = false;
  };
  
  const editTask = () => {
    console.log('Editing task...');
  };
  </script>
  
  <style scoped>
  ion-header {
    --background: #ffffff;
  }
  
  ion-toolbar {
    --background: #007bff;
    --color: white;
  }
  
  .task-header ion-card {
    margin: 10px;
    --background: #f0f4f8;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .task-description {
    font-size: 14px;
    color: #444;
    padding: 10px 0;
  }
  
  .status-chip {
    margin-top: 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
  }
  
  .task-meta {
    margin-top: 15px;
  }
  
  .task-meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.task-meta-item ion-icon {
  margin-right: 10px;
  color: #007bff;
}
  
  .assignees {
    margin-top: 20px;
  }
  
  .assignee-avatars {
    display: flex;
    flex-wrap: wrap;
  }
  
  ion-avatar {
    margin: 5px;
  }
  
  ion-card {
    margin-top: 20px;
    --background: #fff;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  ion-button {
    --background: #f4f4f4;
    --color: #007bff;
  }
  
  .activity ion-button {
    background-color: #007bff;
    color: white;
  }
  
  .files ion-button {
    background-color: #e0e0e0;
  }
  
  .audit-trail {
    margin-top: 20px;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }
  
  .audit-trail h3 {
    font-size: 16px;
    color: #444;
  }
  
  .audit-trail p {
    font-size: 14px;
    color: #666;
  }
  
  ion-fab-button {
    --background: #007bff;
  }
  
  ion-fab {
    margin-bottom: 16px;
    margin-right: 16px;
  }
  </style>
  