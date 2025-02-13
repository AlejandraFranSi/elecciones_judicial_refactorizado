<template>
  <!--       Este es la ventana pop-up en la que se muestra la info de la persona
      seleccionada -->
  <div class="contenedor-externo" id="prueba_popup">
    <div class="contenedor-izquierda">
      <!-- Esta sección es solo el nombre -->
      <div class="contenedor-nombre">
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
      <div class="contenedor-personal">
        <p>
          Sexo:<span class="highlight">{{ datos_candidate["sexo"] }}</span>
        </p>
        <p>
          Entidad de residencia:
          <span class="highlight">{{
            datos_candidate["entidad_residencia"]
          }}</span>
        </p>
        <p>
          Edad:<span class="highlight"> {{ datos_candidate["edad"] }}</span>
        </p>
        <p>
          Cargo al que se postula:<span class="highlight">
            {{ datos_candidate["edad"] }}
          </span>
        </p>
      </div>
      <!-- Esta sección es la de educación -->
      <div class="contenedor-educacion">
        <h3 class="header-educacion">EDUCACIÓN</h3>
        <ul>
          <li>Licenciatura: {{ licenciatura }}</li>
          <li>Maestría: {{ maestria }}</li>
          <li>Doctorado: {{ doctorado }}</li>
          <li>Posgrado: {{ posgrado }}</li>
        </ul>
      </div>
      <!-- Esta sección es la de trayectoria -->
      <div class="contenedor-no-lugares">
        <h3 class="header-lugares">NÚMERO DE LUGARES DE TRABAJO:</h3>
        <p class="no-lugares-trabajo">{{ no_lugares_trabajo }}</p>
      </div>
    </div>

    <div class="contenedor-derecha">
      <div class="contenedor-trabajo">
        <h3 class="header-derecha">EXPERIENCIA RECIENTE</h3>
        <ul>
          <li v-for="(cargo, index) in lista_lugares_trabajo" :key="index">
            {{ cargo }}
          </li>
          <li v-for="(cargo, index) in lista_lugares_trabajo" :key="index">
            {{ cargo }}
          </li>
          <li v-for="(cargo, index) in lista_lugares_trabajo" :key="index">
            {{ cargo }}
          </li>
        </ul>
      </div>
      <!-- Esta sección es la de los iconos-->
      <div class="contenedor-calificaciones">
        <div class="contenedor-iconos">
          <div
            class="icono-label"
            :style="`${
              servidor_publico == 'si' ? 'opacity: 1' : 'opacity: 0.3'
            }`"
          >
            <img src="../assets/img/servidor_publico.png" />
            <p class="icon-text">Funcionario Público</p>
          </div>

          <div
            class="icono-label"
            :style="`${sancion_sfp == 'si' ? 'opacity: 1' : 'opacity: 0.3'}`"
          >
            <img src="../assets/img/sancion.png" />
            <p class="icon-text">Sanción FP</p>
          </div>

          <div
            class="icono-label"
            :style="`${
              declaracion_patrimonial == 'si' ? 'opacity: 1' : 'opacity: 0.3'
            }`"
          >
            <img src="../assets/img/patrimonio.png" />
            <p class="icon-text">Declaración Patrimonial</p>
          </div>
        </div>
      </div>

      <!-- Esta sección es la de antecedentes en medios -->
      <div class="contenedor-noticias">
        <h3 class="header-derecha">ANTECEDENTES EN NOTICIAS</h3>
        <p class="contenedor-antecedentes-texto" v-if="sin_antecedentes_medios">
          Sin antecedentes
        </p>
        <div class="contenedor-antecedentes" v-if="!sin_antecedentes_medios">
          <div
            v-for="(antecedente, index) in antecedentes_medios"
            :key="index"
            class="antecedente"
            :style="`${
              index_seleccion_medios == index ? 'opacity: 1' : 'opacity: 0.3'
            }`"
            :id="`${index}-antecedente-medios`"
            @click="seleccionarAntecedenteMedios(antecedente, index)"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div
          class="contenedor-atexto-antecedente"
          v-if="!sin_antecedentes_medios"
        >
          {{ antecedente_seleccionado_medios }}
        </div>
      </div>
      <!-- Esta sección es la de anecedentes en redes sociales -->
      <div class="contenedor-sociales">
        <h3 class="header-derecha">ANTECEDENTES EN REDES SOCIALES</h3>
        <p
          class="contenedor-antecedentes-texto"
          v-if="sin_antecedentes_rsociales"
        >
          Sin antecedentes
        </p>
        <div class="contenedor-antecedentes" v-if="!sin_antecedentes_rsociales">
          <div
            v-for="(antecedente, index) in antecedentes_rsociales"
            :key="index"
            class="antecedente"
            :style="`${
              index_seleccion_rsociales == index ? 'opacity: 1' : 'opacity: 0.3'
            }`"
            :id="`${index}-antecedente-rs`"
            @click="seleccionarAntecedenteSociales(antecedente, index)"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div
          class="contenedor-atexto-antecedente"
          v-if="!sin_antecedentes_rsociales"
        >
          {{ antecedente_seleccionado_rsociales }}
        </div>
      </div>
    </div>
  </div>
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
const sin_antecedentes_medios = ref(false);
const antecedentes_rsociales = ref([]);
const sin_antecedentes_rsociales = ref(false);
const antecedente_seleccionado_medios = ref();
const antecedente_seleccionado_rsociales = ref();
const index_seleccion_medios = ref(0);
const index_seleccion_rsociales = ref(0);

//const antecedente_tooltip = ref("");
//const tooltip_antecedentes = ref();

const contenedor_popup = ref();

function seleccionarAntecedenteSociales(texto, indice) {
  antecedente_seleccionado_rsociales.value = texto;
  index_seleccion_rsociales.value = indice;
}

function seleccionarAntecedenteMedios(texto, indice) {
  antecedente_seleccionado_medios.value = texto;
  index_seleccion_medios.value = indice;
}
/* function abrirTooltip(x) {
  //console.log(x);
  antecedente_tooltip.value = x;
  tooltip_antecedentes.value.style("visibility", "visible");
}
function cerrarTooltip() {
  antecedente_tooltip.value = "";
  tooltip_antecedentes.value.style("visibility", "hidden");
}

function ajustarPosicionTooltip() {
  let alto_pantalla = window.innerHeight;
  let ancho_pantalla = window.innerWidth;
  let x_cor = event.clientX - ancho_pantalla * 0.1 + 20;
  let y_cor = event.clientY - alto_pantalla * 0.1 + 20;
  //console.log(position);
  tooltip_antecedentes.value
    .style("left", x_cor + "px")
    .style("top", y_cor + "px");
} */
onMounted(() => {
  //console.log(datos_candidate.value);
  contenedor_popup.value = d3.select("div.contenedor-externo");
  //tooltip_antecedentes.value = d3.select("div#tooltip");
  //tooltip_antecedentes.value.style("visibility", "hidden");

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
  // Primero los de medios
  antecedentes_medios.value =
    datos_candidate.value["antecedentes_medios"].split("/");
  if (antecedentes_medios.value[0] == "No aplica") {
    sin_antecedentes_medios.value = true;
  } else {
    antecedente_seleccionado_medios.value = antecedentes_medios.value[0];
  }
  // Ahora los de redes sociales
  antecedentes_rsociales.value =
    datos_candidate.value["antecedentes_redes_sociales"].split("/");
  if (antecedentes_rsociales.value[0] == "No aplica") {
    sin_antecedentes_rsociales.value = true;
  } else {
    antecedente_seleccionado_rsociales.value = antecedentes_rsociales.value[0];
  }

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
p {
  /*background-color: red;*/
  margin: 15px 0px;
}
h3 {
  /*background-color: red;*/
  margin: 10px;
  padding-left: 5px;
}
.highlight {
  font-weight: bold;
  color: white;
}
.contenedor-externo {
  height: 100%;
  background-color: #f5f5f5;
  /*background-color: #ebe3dd;*/
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-star;
  border: none;
  border-radius: 15px;
}
.contenedor-izquierda {
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  background-color: #1d69a2;
  color: #cee1f1;
  padding: 18px;
  align-content: stretch;
  gap: 5px;
}
.contenedor-derecha {
  display: flex;
  flex-wrap: wrap;
  width: 49%;
  align-content: stretch;
  /*margin-top: 4%;*/
  padding: 18px;
  gap: 10px;
}

.contenedor-nombre {
  /*background-color: limegreen;*/
  margin: 0px;
  color: white;
}
.nombre-candidate {
  font-size: 60px;
  line-height: 3rem;
  /*background-color: red;*/
  margin: 0px;
  text-align: center;
  border-bottom: solid;
  border-top-width: 2px;
}
.contenedor-personal {
  /*background-color: orange;*/
  width: 100%;
  height: auto;
  font-size: 17px;
}
.contenedor-educacion {
  /*background-color: red;*/
  width: 100%;
  font-size: 17px;
  color: white;
}
.contenedor-no-lugares {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  /*background-color: cyan;*/
  width: 100%;
  font-size: 16px;
  color: white;
}
.header-lugares {
  /*background-color: pink;*/
  width: 70%;
  margin: 10px 0px;
}
.no-lugares-trabajo {
  width: 15%;
  font-weight: bold;
  margin-left: 4%;
  font-size: 38px;
  /*background-color: plum;*/
  margin: 10px 0px;
}
.header-derecha {
  color: #0068a2;
}
.contenedor-trabajo {
  /*background-color: pink;*/
  width: 100%;
  font-size: 18px;
}
.contenedor-calificaciones {
  /*background-color: cyan;*/
  width: 100%;
  font-size: 18px;
  padding: 0px 10px;
}
.contenedor-iconos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /*background-color: plum;*/
  height: 100%;
}

.icono-label {
  /*background-color: grey;*/
  width: 18%;
}
.icon-text {
  /*background-color: limegreen;*/
  text-align: center;
  font-weight: bold;
  color: #e07010;
  font-size: 14px;
  margin: 0px;
}
img {
  object-fit: contain;
  width: 100%;
  /*background-color: purple;*/
}
.contenedor-noticias {
  width: 100%;
  font-size: 16px;
  /*background-color: red;*/
}

.contenedor-sociales {
  /*background-color: orange;*/
  width: 100%;
  font-size: 16px;
}
.contenedor-antecedentes {
  /*background-color: limegreen;*/
  display: flex;
  flex-wrap: wrap;
  margin: 0px 20px;
  /*padding: 10px;*/
  gap: 5px;
}
.contenedor-antecedentes-texto {
  /*background-color: limegreen;*/
  margin: 0px 20px;
  font-size: 18px;
}
.antecedente {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 25px;
  width: 25px;
  background-color: #e07010;
  border: none;
  border-radius: 13px;
  color: white;
  font-weight: bold;
}

.contenedor-atexto-antecedente {
  display: flex;
  flex-wrap: wrap;
  /*background-color: #cee1f1;*/
  margin: 10px 20px;
  font-size: 15px;
  justify-content: flex-start;
  align-content: center;
  font-style: italic;
  /*font-weight: 500;*/
  /*padding: 0px 15px;*/
  /*border: solid 1px #e8c6a9;*/
  border: none;
  border-radius: 10px;
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

/* Para movil*/
@media (max-width: 950px) {
  .contenedor-izquierda {
    width: 100%;
    height: auto;
  }

  .contenedor-derecha {
    width: 100%;
  }
  .nombre-candidate {
    padding: 10px;
  }
}
</style>
