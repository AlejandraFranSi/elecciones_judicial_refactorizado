<template>
  <div class="contenedor-dona" id="contenedor-dona">
    <svg
      id="svg-dona"
      class="svg-dona"
      :width="ancho + margenes.derecha + margenes.izquierda"
      :height="alto_svg"
    >
      <g
        class="grupo-dona"
        :transform="`translate(${margenes.izquierda + ancho / 2},${
          margenes.arriba + alto / 2
        })`"
      ></g>
      <g
        class="grupo-porcentaje"
        :transform="`translate(${margenes.izquierda + ancho / 2},${
          margenes.arriba + alto / 2
        })`"
      >
        <text>{{ valor_porcentaje }} %</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { ref, toRefs, onMounted, onUnmounted, watch } from "vue";

// Llamamos a la data global
// Llamamos nuestras variables locales
const dataStore = useDataOrgano();
const full_data = ref(dataStore.data_organo);

// Llamamos a la data filtrada y definimos las otras variables que nos sirven para el grafico
// eslint-disable-next-line
const props = defineProps({
  datos: {
    type: Array,
    default: Array,
  },
});
const { datos } = toRefs(props);
const datos_graficados = ref();
const valor_porcentaje = ref();

const contenedor_svg = ref();
const svg = ref();
const grupo_dona = ref();
const grupo_porcentaje = ref();
const ancho = ref(0);
const alto_svg = ref();
const alto = ref(0);
const margenes = ref({
  derecha: 10,
  izquierda: 10,
  abajo: 10,
  arriba: 10,
});

const radius = ref();
const arc = ref();
const pie = ref();
//const valor_porcentaje = ref();

function setDataGrafico() {
  datos_graficados.value = [
    { name: "total", value: full_data.value.length - datos.value.length },
    { name: "grupo_interes", value: datos.value.length },
  ];

  valor_porcentaje.value = (
    (datos.value.length / full_data.value.length) *
    100
  ).toFixed(2);
}
function reescalanding() {
  dimensionandingDona();
  dibujandingDona();
}

function dimensionandingDona() {
  ancho.value =
    contenedor_svg.value.clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;

  if (window.innerWidth <= 1100) {
    alto_svg.value = ancho.value;
  } else if (1100 <= window.innerWidth <= 1400) {
    alto_svg.value = 500;
  } else {
    alto_svg.value = 700;
  }

  alto.value = alto_svg.value - margenes.value.arriba - margenes.value.abajo;
  radius.value = Math.min(ancho.value, alto.value) / 2;

  arc.value = d3
    .arc()
    .innerRadius(radius.value * 0.67)
    .outerRadius(radius.value - 1);

  pie.value = d3
    .pie()
    .padAngle(1 / radius.value)
    .sort(null)
    .value((d) => d.value);

  grupo_porcentaje.value.attr("font-size", 50).attr("text-anchor", "middle");
}

function dibujandingDona() {
  grupo_dona.value.selectAll("path").remove();

  grupo_dona.value
    .selectAll()
    .data(pie.value(datos_graficados.value))
    .join("path")
    .attr("fill", (d) => {
      if (d.data.name == "total") {
        return "#42474C";
      } else {
        return "#DA792F";
      }
    })
    .attr("d", arc.value);
}

onMounted(() => {
  contenedor_svg.value = document.getElementById(`contenedor-dona`);
  svg.value = d3.select(`svg#svg-dona`);
  grupo_dona.value = svg.value.select("g.grupo-dona");
  grupo_porcentaje.value = svg.value.select("g.grupo-porcentaje");

  setDataGrafico();

  dimensionandingDona();
  dibujandingDona();
  window.addEventListener("resize", reescalanding);
});
onUnmounted(() => {
  window.removeEventListener("resize", reescalanding);
});
watch(dataStore, () => {
  full_data.value = dataStore.data_organo;

  setDataGrafico();
  dimensionandingDona();
  dibujandingDona();
});
watch(datos, () => {
  setDataGrafico();
  dimensionandingDona();
  dibujandingDona();
});
</script>
<style></style>
