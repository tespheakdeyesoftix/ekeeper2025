<template>
      
 
  
     <div class="ion-activatable ripple-parent kpi-box">
      <ion-ripple-effect></ion-ripple-effect>
      <h2 class="kpi-value"><slot></slot></h2>
      <ion-text class="kpi-label">{{ label }}</ion-text>
    </div>   
 
        


</template>
<script lang="ts" setup>
      import {  IonRippleEffect ,IonText } from '@ionic/vue';
      const props = defineProps({
        label:String,
        url:String
      })
</script>
<style scoped>
.kpi-box {
    border-radius: 12px; /* Rounded corners */
    background: #056df5; /* White background */
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
    padding: 10px;
   
    
}

.kpi-label {
    font-size: 1rem;
    color: #efeded;
    font-weight: 500;
}

.kpi-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #e6e6e6;
    margin-top: 5px;
}

.ripple-parent {
    position: relative;
    overflow: hidden;

    border: 1px solid #ddd;
  }

 
 

</style>