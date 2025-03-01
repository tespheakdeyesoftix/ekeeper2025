
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getApi, getDocList } from "@/services/api-service";
import { InfiniteScrollCustomEvent, modalController } from "@ionic/vue";

import { useApp } from "./useApp";
import { filter } from "ionicons/icons";

export function useDocList(props: any) {
  const { getMeta } = useApp();
  const loading = ref(true);
  let orFilters : any[] = [];
  let filters : any[] = [];
  let  meta: any ={};
  const canLoadMore = ref(true);
  const pageSize = ref(20);
  const data = ref<any[]>([])
  const keyword = ref<string>(''); // Declare keyword type as string
  const startIndex = ref(0);
  const loadingMoreData = ref(false)

  const groupBy = ref("room_type")


 
  async function getData() {
     
    const response = await getDocList(props.docType, {
      fields: props.fields,
      filters: props.filters,
      orFilters: orFilters,
      limit_start: startIndex.value,
      limit: pageSize.value,
    });
    loading.value = false;
    loadingMoreData.value = false
    if (response.data) {
      return response.data;
    }
    return []
  }

  const onLoadMore = async (event: InfiniteScrollCustomEvent) => {
    loadingMoreData.value = true
    if (!canLoadMore.value) return event.target.complete();

    startIndex.value += pageSize.value;
    loadingMoreData.value = true
    const result = await getData();



    if (result.length < pageSize.value || !result) {
      canLoadMore.value = false;
    }
    data.value.push(...result);
    
    event.target.complete();
  };
 
  const onRefresh = async (event: CustomEvent) => {
    startIndex.value = 0;
    const result = await getData();
    
    data.value = result;



   
  };
 

  async function  onSearch  (str:string=""){
 
    if(meta){
    loading.value = true;
    canLoadMore.value = true;
    startIndex.value = 0;
    if(str){
      let filter:any[] = []
      const keywordEncode = encodeURIComponent(str);
      
      filter.push(["name", 'like', `%${keywordEncode}%`])
      // title field
      if (meta.title_field) {
        filter.push([meta.title_field, 'like', `%${keywordEncode}%`])
      }
      if (meta.search_fields) {
        meta.search_fields.split(",").map((item: string) => item.trim()).forEach((f: string) => {
          filter.push([f, 'like', `%${keywordEncode}%`])
        });
      }
     
      orFilters = filter;
    }else {
      orFilters = []
    }
    data.value = await getData();
    loading.value = false;
    }

    
  }

  onMounted(async () => {
   
    loading.value = true
   orFilters = props.orFilters;
    const result = await getData();
    data.value = result

    meta = await getMeta(props.docType);
  })



  return {
    loading,
    loadingMoreData,
    data,
    meta,
    onSearch,
    getData,
    onLoadMore,
    onRefresh
  };
}
