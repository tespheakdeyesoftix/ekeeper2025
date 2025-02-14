 
import { onMounted, ref } from "vue";
 
import {  alertController,onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { getApi } from "@/services/api-service";
import { useApp } from "./useApp";




export function useRoom() {
  const {currentProperty,currentWorkingDate} = useApp()
  // State variable
  const loading =ref(true)

  const data = ref()


  // Method
  async function getData(){

    // const result =await getDocList("Customer");
    const response = await getApi("edoor.mobile_api.housekeeping.api.get_dashboard_data",{
      property:currentProperty.value.property_name,
      working_date:currentWorkingDate.value

    })
    
    data.value = response.data
  }

 
  
  onMounted(async ()=>{
    alert("home is mounted")
    await getData();
    loading.value = false;
 
  })

 


  return { 
    data,
    loading
};
}
