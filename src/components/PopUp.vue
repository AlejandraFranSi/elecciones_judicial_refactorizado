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

      <!-- Esta sección es la de antecedentes en medios -->
      <div class="contenedor-noticias">
        <p class="highlight header-antecedentes">Antecedentes en noticias</p>
        <div class="contenedor-antecedentes">
          <div
            v-for="(antecedente, index) in antecedentes_medios"
            :key="index"
            class="antecedente"
            :id="`${index}-antecedente-medios`"
            @mouseover="abrirTooltip(antecedente)"
            @mouseleave="cerrarTooltip"
            @mousemove="ajustarPosicionTooltip"
          ></div>
        </div>
      </div>
      <!-- Esta sección es la de anecedentes en redes sociales -->
      <div class="contenedor-sociales">
        <p class="highlight header-antecedentes">
          Antecedentes en redes sociales
        </p>
        <div class="contenedor-antecedentes">
          <div
            v-for="(antecedente, index) in antecedentes_rsociales"
            :key="index"
            class="antecedente"
            :id="`${index}-antecedente-rs`"
            @mouseover="abrirTooltip(antecedente)"
            @mouseleave="cerrarTooltip"
            @mousemove="ajustarPosicionTooltip"
          ></div>
        </div>
      </div>
    </div>

    <div class="contenedor-derecha">
      <!-- Esta sección es la de educación -->

      <div class="contenedor-educacion">
        <h3>Educación</h3>
        <ul>
          <li>Licenciatura: {{ licenciatura }}</li>
          <li>Maestría: {{ maestria }}</li>
          <li>Doctorado: {{ doctorado }}</li>
          <li>Posgrado: {{ posgrado }}</li>
        </ul>
      </div>
      <!-- Esta sección es la de trayectoria -->
      <div class="contenedor-no-lugares">
        <h3>No. lugares de trabajo:</h3>
        <p class="no-lugares-trabajo">{{ no_lugares_trabajo }}</p>
      </div>
      <div class="contenedor-trabajo">
        <h3>Experiencia reciente</h3>
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

const contenedor_popup = ref();

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
  let alto_pantalla = window.innerHeight;
  let ancho_pantalla = window.innerWidth;
  let x_cor = event.clientX - ancho_pantalla * 0.1 + 20;
  let y_cor = event.clientY - alto_pantalla * 0.1 + 20;
  //console.log(position);
  tooltip_antecedentes.value
    .style("left", x_cor + "px")
    .style("top", y_cor + "px");
}
onMounted(() => {
  //console.log(datos_candidate.value);
  contenedor_popup.value = d3.select("div.contenedor-externo");
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
p {
  /*background-color: red;*/
  margin: 15px 0px;
}
h3 {
  /*background-color: red;*/
  margin: 10px;
  padding-left: 5px;
  color: #ca6d27;
  background-color: #ebe3dc;
  border-radius: 8px;
  border-top: solid;
  border-top-width: 2px;
  border-top-color: #ca6d27;
}
.highlight {
  font-weight: bold;
}
.contenedor-externo {
  height: 100%;
  background-color: #f5f5f5;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-star;
}
.contenedor-izquierda {
  display: flex;
  flex-wrap: wrap;
  width: 38%;
  height: 97.1%;
  background-color: #1d69a2;
  color: #cee1f1;
  padding: 10px;
  align-content: flex-start;
  gap: 5px;
}
.contenedor-derecha {
  display: flex;
  flex-wrap: wrap;
  width: 57%;
  padding: 10px;
  /*background-color: pink;*/
  align-content: flex-start;
  gap: 10px;
}

.contenedor-nombre {
  /*background-color: limegreen;*/
  margin: 0px;
}
.nombre-candidate {
  font-size: 84px;
  /*background-color: red;*/
  margin: 0px;
  text-align: center;
}
.contenedor-personal {
  /*background-color: orange;*/
  width: 100%;
  height: auto;
  font-size: 22px;
}

.contenedor-noticias {
  width: 100%;
  font-size: 24px;
  color: white;
  /*background-color: red;*/
  margin-top: 0px;
  padding-top: 0px;
  padding: 0px;
}

.contenedor-sociales {
  /*background-color: cyan;*/
  width: 100%;
  font-size: 24px;
  color: white;
}
.contenedor-antecedentes {
  display: flex;
  flex-wrap: wrap;
  /*padding: 10px;*/
  gap: 5px;
}
.antecedente {
  height: 20px;
  width: 20px;
  background-color: white;
}

.contenedor-educacion {
  /*background-color: orange;*/
  width: 100%;
  font-size: 20px;
}
.contenedor-no-lugares {
  /*background-color: limegreen;*/
  width: 100%;
  font-size: 20px;
}
.no-lugares-trabajo {
  font-weight: bold;
  margin-left: 4%;
  font-size: 22px;
}
.contenedor-trabajo {
  /*background-color: pink;*/
  width: 100%;
  font-size: 20px;
}
.contenedor-calificaciones {
  /*background-color: cyan;*/
  width: 100%;
  font-size: 20px;
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

/* Para tableta */
/* @media (max-width: 900px) {
  .contenedor-izquierda {
    display: flex;
    flex-wrap: wrap;
    width: 38%;
    height: 97.5%;

  }
  .contenedor-derecha {
    display: flex;
    flex-wrap: wrap;
    width: 57%;
    padding: 10px;
    background-color: pink;
    align-content: flex-start;
    gap: 10px;
  }

} */
/* Para movil*/
@media (max-width: 900px) {
  h3 {
    border-top-width: 1.5px;
  }
  .contenedor-izquierda {
    width: 100%;
    height: auto;
    background-color: #f5f5f5;
    padding: 0px;
  }
  .contenedor-derecha {
    width: 98%;
  }

  .contenedor-nombre {
    background-color: #1d69a2;
    margin: 0px;
    width: 100%;
    padding: 10px;
  }
  .contenedor-personal {
    width: 100%;
    color: black;
    padding: 10px;
  }

  .contenedor-noticias {
    color: #1d69a2;
    padding: 10px;
  }

  .contenedor-sociales {
    /*background-color: cyan;*/
    color: #1d69a2;
    width: 100%;
    font-size: 24px;
    padding: 10px;
  }

  .antecedente {
    height: 25px;
    width: 25px;
    background-color: #a7cced;
  }
  .header-antecedentes {
    background-color: #e2ebf3;
    color: #1d69a2;
    border-radius: 8px;
    border-top: solid;
    border-top-width: 1.5px;
    border-top-color: #1d69a2;
    padding-left: 5px;
  }
}
</style>
