<template>
  <div @click="openSheetModal" style="display: inline;">
 
    <!-- Display select as chip control -->
    <template v-if="mode == 'chip'">
      <ion-chip :color="selected ? selectedColor : color">
        <ion-label v-if="!selected">{{ labelPrefix }} {{ label ?? docType }}</ion-label>
        <ion-label v-else>
          <!-- Show Value -->
          {{ getLabel() }}
        
        </ion-label>

        <ion-icon v-if="clear && selected" :icon="close" @click.stop="onClear"></ion-icon>
      </ion-chip>
    </template>
    <!-- end display select as chip control -->



    <slot v-if="hasDefaultSlot"></slot>

  </div>
</template>

<script setup>
import { onMounted, ref, useSlots } from "vue"
import { modalController, IonButton } from '@ionic/vue';
import ComSelectSheetModal from '@/views/components/ComSelectSheetModal.vue';
import { close } from 'ionicons/icons';
import { useApp } from "@/hooks/useApp";
const props = defineProps({
  docType: String,
  label: String,
  filter: Object,
  valueField: {
    type: String,
    default: "name"
  },
  labelField: {
    type: String,
    default: "name"
  },
  multiple: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: "chip"//chip, button,....add more if needed
  },
  clear: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: ""
  },
  selectedColor: {
    type: String,
    default: "warning"
  },

  modalType: {
    modalType: String,
    default: "sheet_modal"
  },

  labelPrefix: String


})

const emit = defineEmits()
const meta = ref()
const selected = ref()
const slots = useSlots();

const { getMeta } = useApp(props)

const hasDefaultSlot = ref(slots.default);

const openSheetModal = async () => {

  const modalOption = {
    component: ComSelectSheetModal,
    swipeToClose: false,
    componentProps: { ...props, selectedValue: selected.value ? selected.value[props.valueField] : "",selected:selected.value }
  }


  if (props.modalType == "sheet_modal") {

    modalOption.initialBreakpoint = 0.65,
      modalOption.breakpoints = [0, 0.5,0.65, 0.75, 0.95]
  }


  const modal = await modalController.create(modalOption);
  await modal.present();

  const { data, role } = await modal.onWillDismiss();
 
  if (role === 'confirm') {
    
    selected.value = data;
    emit("onSelected", data)
  }
};

function getLabel() {
  if (!props.multiple) {
  
    if (meta.value.title_field) {
      return selected.value[meta.value.title_field];
    } else if (props.labelField) {
      return selected.value[props.labelField];
    } else {
      return selected.value.name;
  }
  } else {
    if (Array.isArray(selected.value)) {
        
      if (selected.value.length == 1) {
        if (meta.value.title_field) {
          return selected.value[0][meta.value.title_field];
        } else if (props.labelField) {
          
          return selected.value[0][props.labelField];
        } else {
          return selected.value[0].name;
        }
      } else {
        return `${selected.value.length} ${(props.label || props.docType)}s` ;
      }
    }  

  }

}

function onClear() {
  selected.value = null;
  emit("onClear");
}
onMounted(async () => {
  meta.value = await getMeta(props.docType)

})
</script>

<style scoped>
ion-modal {
  --border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background: red;
}

ion-modal.auto-height::part(content) {
  position: relative;
  --varPer: 50%;
  bottom: 0px;
  height: var(--varPer);
  top: calc(var(--varPer) / 2);
}
</style>