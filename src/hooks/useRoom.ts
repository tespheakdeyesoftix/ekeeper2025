 
import { onMounted, ref } from "vue";
 
import {  alertController,onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { getApi, postApi } from "@/services/api-service";
import { useApp } from "./useApp";




export function useRoom() {
  
  const {currentProperty,currentWorkingDate} = useApp()
  // State variable
  const loading =ref(true)
  const data = ref()
  const filter = ref({property_name:currentProperty.value.property_name, date:currentWorkingDate})
  const groupBy=ref("room_type");
  // Method
  async function getData(){

    // const result =await getDocList("Customer");
    const response = await postApi("edoor.mobile_api.housekeeping.api.get_room_list",{
      property:filter.value.property_name,
      date:filter.value.date

    })
 
    data.value = response.data

  }

  function onFilter(filter:any){
    alert("filter");
    console.log(filter);

  }

  function onSearch(keyword:string){
    // TO do later
    alert("u search me " + keyword)
  }

  const onRefresh = async (event: CustomEvent) => {
    await getData()
    event.target.complete();    
  
  };

  function onRoomLongPress(room:any){
    alert("room log press clci" + JSON.stringify(room))
  }

  onMounted(async ()=>{
    await getData();
    loading.value = false;
  })
  

 
  return { 
    data,
    loading,
    filter,
    groupBy,
    onSearch,
    onFilter,
    onRefresh,
    getData,
    onRoomLongPress
};
}
