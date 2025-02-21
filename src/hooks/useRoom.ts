 
import { computed, onMounted, ref } from "vue";
import dayjs from 'dayjs';
import {  alertController,onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { getApi, postApi } from "@/services/api-service";
import { useApp } from "./useApp";

const groupBy=ref("floor");
const data = ref()
const filter = ref<any>({
  property_name:"",
  room_status:null,
  housekeeping_status_code:null,
  employee:null,
  building:null,
  floor:null
});
let backupData: any[] = [];
export function useRoom() {
  const {currentProperty,currentWorkingDate} = useApp()

  
  
  // State variable
  const loading =ref(true)

  filter.value = {
    property_name: currentProperty.value.property_name,
    date: currentWorkingDate.value  
  }
 
  // Method
  async function getData(){

    // const result =await getDocList("Customer");
    const response = await postApi("edoor.mobile_api.housekeeping.api.get_room_list",{
      property:filter.value.property_name,
      date:filter.value.date

    })
 
    data.value = response.data
    backupData = response.data

    loading.value = false;

  }

  async function onFilter(f:any){
    const l = await window.showLoading();
   
    let result = backupData;
 
    

    if(backupData){
      
      if(f.keyword){
        result =backupData.filter((r:any)=>(r.room_number).toLowerCase().includes(f.keyword.toLowerCase()))
      }
      if(f.room_status){
        const roomStatus  = JSON.parse(JSON.stringify(f.room_status)); 
        result  =result.filter((r:any)=>roomStatus.includes(r.room_status))
      }
      if(f.housekeeping_status_code){
        const housekeepingStatusCode  = JSON.parse(JSON.stringify(f.housekeeping_status_code)); 
        result  =result.filter((r:any)=>housekeepingStatusCode.includes(r.housekeeping_status_code))
      }
      if(f.employee){
        const Employee  = JSON.parse(JSON.stringify(f.employee)); 
        result  =result.filter((r:any)=>Employee.includes(r.employee))
      }
      if(f.building){
        const Building  = JSON.parse(JSON.stringify(f.building)); 
        result  =result.filter((r:any)=>Building.includes(r.building))
      }
      if(f.floor){
        const Floor  = JSON.parse(JSON.stringify(f.floor)); 
        result  =result.filter((r:any)=>Floor.includes(r.floor))
      }
    }

    data.value = result;
    await l.dismiss();
    filter.value = f; 
  }

  function onSearch(keyword:string){
    // TO do later
    filter.value.keyword = keyword;
    onFilter(filter.value);

  }

  const onRefresh = async (event: CustomEvent) => {
    await getData()
    event.target.complete();    
  
  };

  function onRoomLongPress(room:any){
    alert("room log press clci" + JSON.stringify(room))
  }

   
function onChangeGroupBy(){
  if(groupBy.value == "room_type"){
    groupBy.value = "floor"
  }else {
    groupBy.value = "room_type"
  }
}

const onDateChange = async (event) => {
const loading = await window.showLoading("Loading")
filter.value.date = dayjs(event.detail.value).format("YYYY-MM-DD")
 await getData();
 await loading.dismiss()
};

 
  return { 
    data,
    loading,
    filter,
    groupBy,
    onSearch,
    onFilter,
    onRefresh,
    getData,
    onRoomLongPress,
    onChangeGroupBy,
    onDateChange
};
}
