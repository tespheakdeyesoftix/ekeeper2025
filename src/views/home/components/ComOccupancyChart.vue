<template>
  <div class="ion-margin-top chart-container"  >
    <ion-text color="primary" ><h2>{{t("Occupancy")}}</h2></ion-text>
    <v-chart class="chart" :option="option" autoresize />
  </div>
    
  </template>
  
  <script setup>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import {  IonText} from '@ionic/vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { ref } from 'vue';
import { graphic } from 'echarts';
 
  const props = defineProps({
    data:Object
  })
  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ]);
  
  const option =ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Occupancy',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        formatter: props.data?.occupancy + "%"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: props.data?.occupy, name: t('Occupy'),itemStyle: { color: props.data?.occupy_color } },
        { value: props.data?.total_room_vacant, name: t('Vacant Room'), itemStyle: { color: props.data?.vacant_color }}
      ]
    }
  ]
});


  </script>
  
  <style scoped>
.chart-container {
  background: rgba(223, 239, 248, 0.435);
  height: 285px;
  overflow-y: hidden;
  border-radius: 10px;
  padding:0 10px;
}


 .chart {
  height: 250px;
  margin: 0px;
}
  </style>
  