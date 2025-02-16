<template>
  <div @click="openSheetModal" style="display: inline;">
    <template v-if="mode == 'chip'">
      <ion-chip :color="selected?selectedColor:color">
        <ion-label v-if="!selected">{{labelPrefix }} {{ label ?? docType }}</ion-label>
        <ion-label v-else>
          <!-- Show Value -->
          {{ getLabel() }}
        </ion-label>

        <ion-icon v-if="clear && selected" :icon="close"   @click.stop="onClear"></ion-icon>
      </ion-chip>
    </template>

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
  label:String,
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
  labelPrefix:String 


})

const emit = defineEmits()
const meta = ref()
const selected = ref()
const slots = useSlots();

const { getMeta } = useApp(props)

const hasDefaultSlot = ref(slots.default);

const openSheetModal = async () => {
  const modal = await modalController.create({
    component: ComSelectSheetModal,
    initialBreakpoint: 0.5,
    breakpoints: [0, 0.5, 0.75, 0.95],
    swipeToClose: false,
    componentProps: {...props,selectedValue:selected.value?selected.value[props.valueField]:""}
  });
  await modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    selected.value = data;
    emit("onSelected",data)
  }
};

function getLabel() {
  if (!props.multiple) {
    if (meta.value.title_field) {
      return selected.value[meta.value.title_field];
    } else if (props.labelField) {
      return selected.value(props.labelField);
    } else {
      return selected.value.name;
    }
  } else {
    return "multiple value"
  }

}

function onClear(){
  selected.value=null;
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