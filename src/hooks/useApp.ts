 
import { ref } from "vue";
 
const currentProperty = ref({})
const currentWorkingDate = ref("")
const currentWorkingDay = ref({})

export function useApp() {
 
  return { 
    currentProperty,
    currentWorkingDate,
    currentWorkingDay
};
}
