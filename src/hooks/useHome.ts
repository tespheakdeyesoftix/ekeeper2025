 
import { ref } from "vue";
 
import {  alertController } from '@ionic/vue';

const data = ref("Hell world from hook")
 

export function useHome() {
 
 
 

  return { 
    data
};
}
