<template>
  <!--       Este es la ventana pop-up en la que se muestra la info de la persona
      seleccionada -->
  <div class="contenedor-externo">
    <div class="contenedor-lateral">
      <!-- Esta sección es solo el nombre -->
      <div class="contenedor-interno">
        <h1 class="nombre-candidate">
          {{
            datos_candidate["nombres"] +
            " " +
            datos_candidate["apellido_paterno"] +
            " " +
            datos_candidate["apellido_materno"]
          }}
        </h1>
      </div>
      <!-- Esta sección es la info básica básica -->
      <div class="contenedor-interno">
        <p>
          <span class="highlight">Sexo:</span> {{ datos_candidate["sexo"] }}
        </p>
        <p>
          <span class="highlight">Entidad de residencia:</span>
          {{ datos_candidate["entidad_residencia"] }}
        </p>
        <p>
          <span class="highlight">Edad:</span> {{ datos_candidate["edad"] }}
        </p>
      </div>
      <!-- Esta sección es la de educación -->
      <div class="contenedor-interno">
        <h3>Educación</h3>
        <ul>
          <li>Licenciatura: {{ licenciatura }}</li>
          <li>Maestría: {{ maestria }}</li>
          <li>Doctorado: {{ doctorado }}</li>
          <li>Posgrado: {{ posgrado }}</li>
        </ul>
      </div>
    </div>

    <div class="contenedor-lateral">
      <!-- Esta sección es la de trayectoria -->
      <div class="contenedor-interno">
        <h3>No. lugares de trabajo: {{ no_lugares_trabajo }}</h3>
        <h3>Experiencia reciente</h3>
        <ul>
          <li v-for="(cargo, index) in lista_lugares_trabajo" :key="index">
            {{ cargo }}
          </li>
        </ul>
      </div>
      <!-- Esta sección es la de los iconos-->
      <div class="contenedor-interno">
        <div class="contenedor-iconos">
          <img
            src="../assets/img/servidor_publico.png"
            :style="`${
              servidor_publico == 'si' ? 'opacity: 1' : 'opacity: 0.5'
            }`"
          />
          <img
            src="../assets/img/sancion.png"
            :style="`${sancion_sfp == 'si' ? 'opacity: 1' : 'opacity: 0.5'}`"
          />
          <img
            src="../assets/img/patrimonio.png"
            :style="`${
              declaracion_patrimonial == 'si' ? 'opacity: 1' : 'opacity: 0.5'
            }`"
          />
        </div>
      </div>
      <!-- Esta sección es la de antecedentes en medios -->
      <div class="contenedor-interno">
        <p>Antecedentes en noticias</p>
        <div class="contenedor-antecedentes">
          <div
            v-for="(antecedente, index) in antecedentes_medios"
            :key="index"
            class="antecedente"
            @mouseover="abrirTooltip(antecedente)"
            @mouseleave="cerrarTooltip"
            @mousemove="ajustarPosicionTooltip"
          ></div>
        </div>
      </div>
      <!-- Esta sección es la de anecedentes en redes sociales -->
      <div class="contenedor-interno">
        <p>Antecedentes en redes sociales</p>
        <div class="contenedor-antecedentes">
          <div
            v-for="(antecedente, index) in antecedentes_rsociales"
            :key="index"
            class="antecedente"
            @mouseover="abrirTooltip(antecedente)"
            @mouseleave="cerrarTooltip"
            @mousemove="ajustarPosicionTooltip"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <div class="tooltip" id="tooltip">{{ antecedente_tooltip }}.</div>
</template>

<script setup>
import * as d3 from "d3";
import { toRefs, ref, onMounted, watch } from "vue";

// eslint-disable-next-line
const props = defineProps({
  datos_candidate: {
    type: Object,
    default: Object,
  },
});
const { datos_candidate } = toRefs(props);

const licenciatura = ref();
const maestria = ref();
const doctorado = ref();
const posgrado = ref();
const no_lugares_trabajo = ref();
const servidor_publico = ref();
const declaracion_patrimonial = ref();
const sancion_sfp = ref();

const lista_lugares_trabajo = ref([]);
const antecedentes_medios = ref([]);
const antecedentes_rsociales = ref([]);
const antecedente_tooltip = ref("");
const tooltip_antecedentes = ref();

function abrirTooltip(x) {
  //console.log(x);
  antecedente_tooltip.value = x;
  tooltip_antecedentes.value.style("visibility", "visible");
}
function cerrarTooltip() {
  antecedente_tooltip.value = "";
  tooltip_antecedentes.value.style("visibility", "hidden");
}

function ajustarPosicionTooltip() {
  let position = d3.pointer(event, document.body);
  let ancho_pantalla = window.innerWidth;
  let alto_pantalla = window.innerHeight;
  let x = position[0] - ancho_pantalla * 0.09;
  let y = position[1] - alto_pantalla * 0.14;
  console.log(ancho_pantalla, alto_pantalla);
  tooltip_antecedentes.value.style("left", x + "px").style("top", y + "px");
}
onMounted(() => {
  //console.log(datos_candidate.value);
  tooltip_antecedentes.value = d3.select("div#tooltip");
  tooltip_antecedentes.value.style("visibility", "hidden");

  // Asociamos los datos básicos
  licenciatura.value = datos_candidate.value["licenciatura"];
  maestria.value = datos_candidate.value["maestria"];
  doctorado.value = datos_candidate.value["doctorado"];
  posgrado.value = datos_candidate.value["posgrado"];
  no_lugares_trabajo.value = datos_candidate.value["no_lugares_trabajo"];
  servidor_publico.value = datos_candidate.value["servidor_publico"];
  declaracion_patrimonial.value =
    datos_candidate.value["declaracion_patrimonial"];
  sancion_sfp.value = datos_candidate.value["sanciones_SFP"];

  // Para cada candidato creamos una lista con los antecedentes encontrados
  antecedentes_medios.value =
    datos_candidate.value["antecedentes_medios"].split("/");
  antecedentes_rsociales.value =
    datos_candidate.value["antecedentes_redes_sociales"].split("/");
  lista_lugares_trabajo.value =
    datos_candidate.value["cargos_lugares_trabajo"].split("/");
  // Y eliminamos los espacios iniciales y finales en cada uno de ellos
  for (let i = 0; i < antecedentes_medios.value.length; i++) {
    antecedentes_medios.value[i] = antecedentes_medios.value[i].trim();
  }
  for (let i = 0; i < antecedentes_rsociales.value.length; i++) {
    antecedentes_rsociales.value[i] = antecedentes_rsociales.value[i].trim();
  }
  for (let i = 0; i < lista_lugares_trabajo.value.length; i++) {
    lista_lugares_trabajo.value[i] = lista_lugares_trabajo.value[i].trim();
  }
});
watch(datos_candidate, () => {
  //antecedentes_medios.value = []
});
</script>

<style scoped>
.contenedor-externo {
  height: 90%;
  /*background-color: orange;*/
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-star;
  margin: 50px;
}
.contenedor-lateral {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  /*background-color: blue;*/
  gap: 10px;
}
.contenedor-interno {
  width: 95%;
  margin: 2%;
  /*background-color: lawngreen;*/
}
.contenedor-iconos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /*background-color: plum;*/
  height: 100%;
}

img {
  object-fit: contain;
  width: 25%;
}
.contenedor-antecedentes {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 5px;
}
.antecedente {
  height: 20px;
  width: 20px;
  background-color: black;
}
.highlight {
  font-weight: bold;
}

.tooltip {
  position: absolute;
  z-index: 2;
  background-color: #252323;
  color: white;
  opacity: 0.93;
  height: auto;
  width: 250px;
  font-size: 14px;
  padding: 5px;
  text-align: left;
}

.nombre-candidate {
  font-size: 60px;
  /*background-color: red;*/
  margin: auto;
  text-align: center;
}

/* Para tableta */
@media (max-width: 1200px) {
  .contenedor-externo {
    margin: 10px;
    height: 98%;
  }
}

/* Para celular */
@media (max-width: 680px) {
  .contenedor-lateral {
    width: 100%;
  }
}
</style>
