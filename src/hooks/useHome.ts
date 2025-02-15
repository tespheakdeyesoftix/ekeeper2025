 
import { onMounted, ref } from "vue";
 
import {  alertController,onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { getApi } from "@/services/api-service";
import { useApp } from "./useApp";




export function useHome() {
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
    console.log(data.value)
  }

  
  const onRefresh = async (event: CustomEvent) => {
    
    await getData();
    event.target.complete();
  };

  
  onMounted(async ()=>{
 
    await getData();
    loading.value = false;

 
  })

 


  return { 
    data,
    loading,
    onRefresh,
    currentProperty
};
}
