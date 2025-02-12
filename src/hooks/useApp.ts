 
import { ref } from "vue";
 
const currentProperty = ref({property_name:""})
const currentWorkingDate = ref("")
const currentWorkingDay = ref({})

export function useApp() {
 
  return { 
    currentProperty,
    currentWorkingDate,
    currentWorkingDay
};
}
