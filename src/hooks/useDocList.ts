
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getApi, getDocList } from "@/services/api-service";
import { InfiniteScrollCustomEvent, modalController } from "@ionic/vue";

import { useApp } from "./useApp";
export function useDocList(props: any) {
  const { getMeta } = useApp();
  const loading = ref(true);
  const meta = ref<any>()
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
      orFilters: props.orFilters,
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
 



  async function  Search  (str:string=""){

    keyword.value = str;
    loading.value = true;
    canLoadMore.value = true;
    startIndex.value = 0;
    data.value = await getData();
    loading.value = false;
  }

  onMounted(async () => {
    
    loading.value = true
    const result = await getData();
    data.value = result
  })



  return {
    loading,
    loadingMoreData,
    data,
    meta,
    Search,
    getData,
    onLoadMore
  };
}
