
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getApi, getDocList } from "@/services/api-service";
import { InfiniteScrollCustomEvent, modalController } from "@ionic/vue";

import { useApp } from "./useApp";
export function useComSelect(props: any) {
  const { getMeta } = useApp();
  const loading = ref(true);
  const meta = ref<any>()
  const canLoadMore = ref(true);
  const pageSize = ref(20);
  const data = ref<any[]>([])
  const keyword = ref<string>(''); // Declare keyword type as string
  const startIndex = ref(0);





  async function getData() {
    
    loading.value = true;
    let fields = ["name"]
    if (meta.value.image_field) {
      fields.push(meta.value.image_field)
    }

    if (meta.value.title_field) {
      fields.push(meta.value.title_field)
    }
    if (meta.value.search_fields) {
      fields = [...fields, ...meta.value.search_fields.split(",").map((item: string) => item.trim())];
    }

    fields = [...new Set(fields)];

    let filters = []
    if (keyword.value) {
      const keywordEncode = encodeURIComponent(keyword.value);
      filters.push(["name", 'like', `%${keywordEncode}%`])
      // title field
      if (meta.value.title_field) {
        filters.push([meta.value.title_field, 'like', `%${keywordEncode}%`])
      }
      if (meta.value.search_fields) {
        meta.value.search_fields.split(",").map((item: string) => item.trim()).forEach((f: string) => {
          filters.push([f, 'like', `%${keywordEncode}%`])
        });
      }




    }
    const andFilter = []
    if (props.selected) {
      if (!props.multiple) {

        andFilter.push(["name", "not in", [props.selected[props.valueField]]])
      }
    }

    const response = await getDocList(props.docType, {
      fields: fields,
      filters: andFilter,
      orFilters: filters,
      limit_start: startIndex.value,
      limit: pageSize.value,

    });
    loading.value = false;
    if (response.data) {
      return response.data;
    }
    return []
  }

  const onLoadMore = async (event: InfiniteScrollCustomEvent) => {

    if (!canLoadMore.value) return event.target.complete();

    startIndex.value += pageSize.value;
    const result = await getData();



    if (result.length < pageSize.value || !result) {
      canLoadMore.value = false;
    }


    data.value.push(...result);
    event.target.complete();
  };

  function onSelect(selected: any) {

    if (props.multiple) {
      Array.isArray(selected)
      if (Array.isArray(selected)) {


        modalController.dismiss(selected, 'confirm')
        data.value = [];
      } else {
        selected.selected = !selected.selected;
      }

    } else {
      modalController.dismiss(selected, 'confirm')
      data.value = [];

    }

  }


  function confirmSelection() {

    onSelect(data.value.filter((r: any) => r.selected));
  }

  const dismissModal = () => {
    data.value = [];
    modalController.dismiss(null, 'cancel')
  };



  const expandModal = async () => {

    const modal = await modalController.getTop();
    if (modal) {
      modal.setCurrentBreakpoint(0.95);
    }
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
    // this method is use to put selcted result to the top
    if (props.selected) {
      if (props.multiple) {

        data.value = [...props.selected.map((s: any) => ({ ...s, selected: true }))]

      } else {
        // single select and have select
        data.value = [{ ...props.selected, selected: true }];

      }
    }
    meta.value = await getMeta(props.docType);
    const result = await getData();
    data.value.push(...result);


  })



  return {
    loading,
    keyword,
    data,
    Search,
    meta,
    getData,
    onLoadMore,
    onSelect,
    dismissModal,
    expandModal,
    confirmSelection

  };
}
