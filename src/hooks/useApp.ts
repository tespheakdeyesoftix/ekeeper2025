 
import { onMounted, ref } from "vue";
 


export function useApp() {
  const currentProperty = ref({property_name:""})
const currentWorkingDate = ref("")
const currentWorkingDay = ref({})


  const currentLanguage = ref("en")
  const languages = [
    {
      lang:"en",
      icon:"/assets/en.svg",
      label:"English"
    },
    
    {
      lang:"kh",
      icon:"/assets/kh.svg",
      label:"ភាសារខ្មែរ"
    }
    ]




  onMounted(()=>{
      currentLanguage.value = window.storageService.getItem("lang") || "en";
       
  })

  return { 
    languages,
    currentProperty,
    currentWorkingDate,
    currentWorkingDay,
    currentLanguage
};
}
