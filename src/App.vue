<template>
  <header>
    <div class="container">
      <div class="row align-items-center justify-content-between">

        <div id="img" class="col1">
          <img src="./assets/edih_hamburg_logo.svg" alt="EDIH Hamburg">
        </div>

        <div id="text" class="col2">
          <h1>{{ $t('Header.title') }}</h1>
        </div>

        <div id="buttons" class="col3">
          <div class="btn-group">
            <select class="btn btn-outline-secondary custom-select" v-model="$i18n.locale">
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
            <button class="btn btn-outline-secondary" onclick="window.open('https://edih-hamburg.de', '_blank');">
              <div>
                <BoxWithRightArrowOut />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>



  <body>
    <div>

      <div v-if="!showResults">
        <Survey @surveyCompleted="handleDmaCompleted" :survey="EUDmaJSON" surveyMode="edit" />
      </div>

      <div v-else-if="EuResults && radarChartDataValues && doughnutChartDataValues">

        <div class="content">
          <div>
            <h5>{{ $t('Results.text') }}</h5>
          </div>
          <div v-if="showSendButton">
            <button class="btn btn-outline-secondary" @click="sendCSV">
              {{ $t('Results.button') }}
            </button>
          </div>
        </div>

        <div>
          <Results :EuResults="EuResults" :radarChartDataValues="radarChartDataValues"
            :doughnutChartDataValues="doughnutChartDataValues" />
        </div>

      </div>
    </div>
  </body>

</template>

<script setup lang="ts">
import Survey from './components/Survey.vue';
import Results from './components/Results.vue';
import { EUDmaJSON } from "./assets/EUDma_json";
import { ref } from 'vue';
import { EuResult } from './interfaces/EuResults';
import { doughnutChartData } from './interfaces/doughnutChartData';
import { radarChartData } from './interfaces/radarChartData';
import { EUcalculation } from "./components/functions/EuResultsCalulation";
import { createCSV } from "./components/functions/createCSV";
import BoxWithRightArrowOut from './components/icons/BoxWithRightArrowOut.vue';

//DMA-Questions
let showResults = ref(false);
let showSendButton = ref(true);
let Answers = ref<EuResult>();
let PlainData = ref<any>();

const handleDmaCompleted = (payload: any) => {
  Answers.value = payload.answers;
  PlainData.value = payload.plainData;
  ResultCalculation();
}

//answer calculation
let EuResults = ref<EuResult>();
let doughnutChartDataValues = ref<Array<doughnutChartData>>([]);
let radarChartDataValues = ref<radarChartData>();
const ResultCalculation = () => {
  EUcalculation(Answers, doughnutChartDataValues, radarChartDataValues, EuResults);
  showResults.value = true;
}

//enable csv download
const sendCSV = () => {
  createCSV(Answers, PlainData);
  showSendButton.value = false;
};

</script>


<style>
@import "./styles/global.css";
</style>
