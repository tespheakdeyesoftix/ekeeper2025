
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getApi, getDoc } from "@/services/api-service";
import {  modalController } from "@ionic/vue";

import { useApp } from "./useApp";


export function useDocument(props: any) {
  const { getMeta } = useApp();
  const loading = ref(true);
  let  meta: any ={};

  const data = ref<any[]>([])



 
  async function getData() {
    const  response = await getApi("frappe.desk.form.load.getdoc",{
        doctype:props.docType,
        name:props.docName
    });
    if(!response.error){
        data.value = response.data
    }

     loading.value = false;

  }
 
 
  const onRefresh = async (event: CustomEvent) => {
    
    await getData();
    event.target.complete();
  };



 

  onMounted(async () => {
    await getData();
  })



  return {
    loading,
    data,
    meta,
    getData,
    onRefresh
  };
}
