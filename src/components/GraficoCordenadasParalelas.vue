<template>
  <div class="contenedor-paralelas" id="contenedor-paralelas">
    <svg
      id="svg-paralelas"
      class="svg-paralelas"
      :width="ancho + margenes.derecha + margenes.izquierda"
      :height="alto_svg"
    >
      <!-- Estos son los grupos contenedores de los ejes -->
      <g class="eje-sexo"></g>
      <g class="eje-grupo-etario"></g>
      <g class="eje-experiencia"></g>
      <g class="eje-grado-academico"></g>
      <!-- Estos son los grupos contenedores de las líneas -->
      <g class="grupo-lineas-sexo-edad"></g>
      <g class="grupo-lineas-edad-academia"></g>
      <g class="grupo-lineas-academia-experiencia"></g>
    </svg>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { ref, toRefs, onMounted, onUnmounted, watch } from "vue";

// Estas son las variables de los datos
// Primero las variables globales
const dataStore = useDataOrgano();
const full_data = ref(dataStore.data_organo);

//Ahora los datos filtrados
// eslint-disable-next-line
const props = defineProps({
  datos: {
    type: Array,
    default: Array,
  },
  filtros: {
    type: Object,
    default: Object,
  },
});
const { datos } = toRefs(props);
const { filtros } = toRefs(props);

// Ahora las necesarias para este gráfico
const options_dict = ref({
  sexo: ["Masculino", "Femenino", "No binario"],
  grupo_etario: [
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55-59",
    "60-64",
    "65-69",
    "70-74",
    "75-80",
  ],
  ultimo_grado: ["Licenciatura", "Maestria", "Doctorado", "Posgrado"],
  anios_experiencia: ["0-4", "5-9", "10-14", "14+"],
});
const filtros_posibles = ref([
  "sexo",
  "grupo_etario",
  "ultimo_grado",
  "anios_experiencia",
]);

//Esta es la parte correspindiente a las variables para el tamaño del svg
const contenedor_svg = ref();
const svg = ref();
const ancho = ref(0);
const alto_svg = ref(500);
const alto = ref(0);
const margenes = ref({
  derecha: 5,
  izquierda: 5,
  abajo: 20,
  arriba: 20,
});

// Estas son las variables correspondientes a los ejes
const eje_sexo = ref();
const eje_grupo_etario = ref();
const eje_experiencia = ref();
const eje_grado_academico = ref();

// Estas son las variables para los grupos contenedores de las líneas
const grupo_lineas_sexo_edad = ref();
const grupo_lineas_edad_academia = ref();
const grupo_lineas_academia_experiencia = ref();

// Estas son las variables para las escalas
const escala_sexo = ref();
const escala_grupo_etario = ref();
const escala_experiencia = ref();
const escala_grado_academico = ref();
const escala_y = ref();
const margen_escalas = ref(2);
const ancho_escarlas_rect = ref(4);

function reescalandingParalelas() {
  dimensionandingParalelas();
  dibujandingParalelas();
  dibujarEjes();
}
function dimensionandingParalelas() {
  // Ajustamos las dimensiones del contenedor de las cajas
  ancho.value =
    contenedor_svg.value.clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value = alto_svg.value - margenes.value.arriba - margenes.value.abajo;

  // Definimos todas nuestras escalas
  escala_y.value = d3.scaleBand(filtros_posibles.value, [
    margenes.value.arriba,
    alto_svg.value * (5 / 4) - margenes.value.abajo,
  ]);
  escala_sexo.value = d3.scaleBand(options_dict.value.sexo, [
    margenes.value.izquierda,
    ancho.value,
  ]);
  escala_grupo_etario.value = d3.scaleBand(options_dict.value.grupo_etario, [
    margenes.value.izquierda,
    ancho.value,
  ]);
  escala_experiencia.value = d3.scaleBand(
    options_dict.value.anios_experiencia,
    [margenes.value.izquierda, ancho.value]
  );
  escala_grado_academico.value = d3.scaleBand(options_dict.value.ultimo_grado, [
    margenes.value.izquierda,
    ancho.value,
  ]);
}

function dibujandingParalelas() {
  // Agregamos el primer bloque de lineas
  // Estas van del sexo al grupo etario
  grupo_lineas_sexo_edad.value.selectAll("path").remove();
  grupo_lineas_sexo_edad.value
    .selectAll("path")
    .data(full_data.value)
    .join("path")
    .attr("d", (d) => {
      let x1 =
        escala_sexo.value(d.sexo) +
        Math.floor(d.random_num * escala_sexo.value.bandwidth());
      let y1 = escala_y.value("sexo");
      let x2 =
        escala_grupo_etario.value(d.grupo_etario) +
        Math.floor(d.random_num * escala_grupo_etario.value.bandwidth());
      let y2 = escala_y.value("grupo_etario");
      return `M${x1},${y1} L${x2}, ${y2}`;
    })
    .attr("stroke", (d) => {
      if (full_data.value == datos.value) {
        return "#555a62";
      } else if (datos.value.includes(d)) {
        return "#6084a8";
      } else {
        return "#555a62";
      }
    })
    .attr("stroke-width", (d) => {
      if (full_data.value == datos.value) {
        return 1;
      } else if (datos.value.includes(d)) {
        return 2;
      } else {
        return 1;
      }
    })
    .attr("fill", "none")
    .attr("opacity", (d) => {
      if (full_data.value == datos.value) {
        return 0.1;
      } else if (datos.value.includes(d)) {
        return 0.3;
      } else {
        return 0.1;
      }
    });

  // El segundo bloque de lineas
  // Las que van de grupo de edad a grado academico
  grupo_lineas_edad_academia.value.selectAll("path").remove();
  grupo_lineas_edad_academia.value
    .selectAll("path")
    .data(full_data.value)
    .join("path")
    .attr("d", (d) => {
      let x1 =
        escala_grupo_etario.value(d.grupo_etario) +
        Math.floor(d.random_num * escala_grupo_etario.value.bandwidth());
      let y1 = escala_y.value("grupo_etario");
      let x2 =
        escala_grado_academico.value(d.ultimo_grado) +
        Math.floor(d.random_num * escala_grado_academico.value.bandwidth());
      let y2 = escala_y.value("ultimo_grado");
      return `M${x1},${y1} L${x2}, ${y2}`;
    })
    .attr("stroke", (d) => {
      if (full_data.value == datos.value) {
        return "#555a62";
      } else if (datos.value.includes(d)) {
        return "#6084a8";
      } else {
        return "#555a62";
      }
    })
    .attr("stroke-width", (d) => {
      if (full_data.value == datos.value) {
        return 1;
      } else if (datos.value.includes(d)) {
        return 2;
      } else {
        return 1;
      }
    })
    .attr("fill", "none")
    .attr("opacity", (d) => {
      if (full_data.value == datos.value) {
        return 0.1;
      } else if (datos.value.includes(d)) {
        return 0.4;
      } else {
        return 0.1;
      }
    });

  // El tercer bloque de lineas
  // Las que van de grado academico a años de experiencia
  grupo_lineas_academia_experiencia.value.selectAll("path").remove();
  grupo_lineas_academia_experiencia.value
    .selectAll("path")
    .data(full_data.value)
    .join("path")
    .attr("d", (d) => {
      let x1 =
        escala_grado_academico.value(d.ultimo_grado) +
        Math.floor(d.random_num * escala_grado_academico.value.bandwidth());
      let y1 = escala_y.value("ultimo_grado");
      let x2 =
        escala_experiencia.value(d.anios_experiencia) +
        Math.floor(d.random_num * escala_experiencia.value.bandwidth());
      let y2 = escala_y.value("anios_experiencia");
      return `M${x1},${y1} L${x2}, ${y2}`;
    })
    .attr("stroke", (d) => {
      if (full_data.value == datos.value) {
        return "#555a62";
      } else if (datos.value.includes(d)) {
        return "#6084a8";
      } else {
        return "#555a62";
      }
    })
    .attr("stroke-width", (d) => {
      if (full_data.value == datos.value) {
        return 1;
      } else if (datos.value.includes(d)) {
        return 2;
      } else {
        return 1;
      }
    })
    .attr("fill", "none")
    .attr("opacity", (d) => {
      if (full_data.value == datos.value) {
        return 0.1;
      } else if (datos.value.includes(d)) {
        return 0.4;
      } else {
        return 0.1;
      }
    });
}
function dibujarEjes() {
  // Ahora vamos a agregar rectángulos para hacer más claras las divisiones por categoría
  eje_sexo.value.selectAll("rect").remove();
  eje_sexo.value
    .selectAll("rect")
    .data(options_dict.value["sexo"])
    .join("rect")
    .attr("x", (d) => escala_sexo.value(d) + margen_escalas.value / 2)
    .attr(
      "y",
      0 -
        /*       escala_y.value("sexo") -
        margenes.value.arriba - */
        ancho_escarlas_rect.value / 2
    )
    .attr("height", ancho_escarlas_rect.value)
    .attr("width", escala_sexo.value.bandwidth() - margen_escalas.value)
    .attr("fill", (d) => {
      if (filtros.value["sexo"] == d) {
        return "#6084a8";
      } else {
        return "black";
      }
    });

  eje_grupo_etario.value.selectAll("rect").remove();
  eje_grupo_etario.value
    .selectAll("rect")
    .data(options_dict.value["grupo_etario"])
    .join("rect")
    .attr("x", (d) => escala_grupo_etario.value(d) + margen_escalas.value / 2)
    .attr("y", 0 - ancho_escarlas_rect.value / 2)
    .attr("height", ancho_escarlas_rect.value)
    .attr("width", escala_grupo_etario.value.bandwidth() - margen_escalas.value)
    .attr("fill", (d) => {
      if (filtros.value["grupo_etario"] == d) {
        return "#6084a8";
      } else {
        return "black";
      }
    });

  eje_grado_academico.value.selectAll("rect").remove();
  eje_grado_academico.value
    .selectAll("rect")
    .data(options_dict.value["ultimo_grado"])
    .join("rect")
    .attr(
      "x",
      (d) => escala_grado_academico.value(d) + margen_escalas.value / 2
    )
    .attr("y", 0 - ancho_escarlas_rect.value / 2)
    .attr("height", ancho_escarlas_rect.value)
    .attr(
      "width",
      escala_grado_academico.value.bandwidth() - margen_escalas.value
    )
    .attr("fill", (d) => {
      if (filtros.value["ultimo_grado"] == d) {
        return "#6084a8";
      } else {
        return "black";
      }
    });

  eje_experiencia.value.selectAll("rect").remove();
  eje_experiencia.value
    .selectAll("rect")
    .data(options_dict.value["anios_experiencia"])
    .join("rect")
    .attr("x", (d) => escala_experiencia.value(d) + margen_escalas.value / 2)
    .attr("y", 0 - ancho_escarlas_rect.value / 2)
    .attr("height", ancho_escarlas_rect.value)
    .attr("width", escala_experiencia.value.bandwidth() - margen_escalas.value)
    .attr("fill", (d) => {
      if (filtros.value["anios_experiencia"] == d) {
        return "#6084a8";
      } else {
        return "black";
      }
    });

  // Llamamos los ejes para todas las escalas
  eje_sexo.value
    .call(d3.axisBottom(escala_sexo.value))
    .attr("transform", `translate(0,${escala_y.value("sexo")})`);

  eje_grupo_etario.value
    .call(d3.axisBottom(escala_grupo_etario.value))
    .attr("transform", `translate(0,${escala_y.value("grupo_etario")})`);

  eje_grado_academico.value
    .call(d3.axisBottom(escala_grado_academico.value))
    .attr("transform", `translate(0,${escala_y.value("ultimo_grado")})`);

  eje_experiencia.value
    .call(d3.axisBottom(escala_experiencia.value))
    .attr("transform", `translate(0,${escala_y.value("anios_experiencia")})`);
}

onMounted(() => {
  // Primero asociamos las variables del contenedor del grafico y svg
  contenedor_svg.value = document.getElementById(`contenedor-paralelas`);
  svg.value = d3.select(`svg#svg-paralelas`);

  // Ahora relacionamos variables con los grupos que contendran los ejes
  eje_sexo.value = svg.value.select("g.eje-sexo");
  eje_grupo_etario.value = svg.value.select("g.eje-grupo-etario");
  eje_experiencia.value = svg.value.select("g.eje-experiencia");
  eje_grado_academico.value = svg.value.select("g.eje-grado-academico");

  // Ahora relacionamos variables con los grupos que contendran las lineas
  grupo_lineas_sexo_edad.value = svg.value.select("g.grupo-lineas-sexo-edad");
  grupo_lineas_edad_academia.value = svg.value.select(
    "g.grupo-lineas-edad-academia"
  );
  grupo_lineas_academia_experiencia.value = svg.value.select(
    "g.grupo-lineas-academia-experiencia"
  );

  //console.log(full_data.value.length);
  dimensionandingParalelas();
  dibujandingParalelas();
  dibujarEjes();
});
onUnmounted(() => {
  window.removeEventListener("resize", reescalandingParalelas);
});
watch(dataStore, () => {
  full_data.value = dataStore.data_organo;
  //console.log(full_data.value.length);
  dimensionandingParalelas();
  dibujandingParalelas();
  dibujarEjes();
});
watch(datos, () => {
  //console.log(datos.value.length);
  dimensionandingParalelas();
  dibujandingParalelas();
  dibujarEjes();
});
watch(filtros, () => {
  //console.log(filtros.value);
  dimensionandingParalelas();
  dibujandingParalelas();
  dibujarEjes();
});
</script>
<style>
/* .contenedor-paralelas {
  background-color: orange;
} */
.eje-sexo {
  position: static;
  z-index: 2;
}
</style>
