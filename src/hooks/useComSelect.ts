 
import { onMounted, ref } from "vue";
import { getApi } from "@/services/api-service";
import { InfiniteScrollCustomEvent } from "@ionic/vue";
export function useComSelect(props:any) {
const loading = ref(true);
    const canLoadMore = ref(true);
    const pageSize = ref(10);
  const data =ref<any[]>([])
  const filter = ref({
    keyword:""
  })    
  const startIndex = ref(0);

  async function getData(){
    const f= {
        doctype: props.docType,  // Replace with your actual Doctype
        txt:filter.value.keyword,                    // Search text
        page_length: startIndex.value,
        // filters: {
        //   status: "Active",     
        //   category: "Electronics" // Another filter example
        // }
    }
    const response = await getApi("frappe.desk.search.search_link",f);
    loading.value = false;
    if(response.data ){
        return response.data;
    }
    return []
  }

  const onLoadMore = async (event: InfiniteScrollCustomEvent) => {
   
    if (!canLoadMore.value) return event.target.complete();
  
    startIndex.value += pageSize.value;
    const result = await getData();
    if (result.length < pageSize) canLoadMore.value = false;
     
    
    data.value.push(...result);
    event.target.complete();
  };

  function onSelect(selectd:any){
    alert(selectd.value)
  }


  onMounted(async ()=>{
   
    data.value =  await getData();

  })



  return { 
    data,   
    getData,
    onLoadMore,
    onSelect
};
}
