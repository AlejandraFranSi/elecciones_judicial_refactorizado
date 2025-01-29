<template>
  <!-- Esta sección es la encargada de controlar la vista -->
  <div class="nav-bar" id="nav-bar">
    <div class="contenedor-botones-vista">
      <button
        class="boton-vista"
        :style="`${
          vista_mostrada == 'descripccion_inicio'
            ? 'background-color: #72CDE9'
            : 'background-color: #f4f5f6'
        }`"
        type="button"
        @click="setVista('descripccion_inicio')"
      >
        Inicio
      </button>
      <button
        class="boton-vista"
        :style="`${
          vista_mostrada == 'herramienta_filtros'
            ? 'background-color: #72CDE9'
            : 'background-color: #f4f5f6'
        }`"
        type="button"
        @click="setVista('herramienta_filtros')"
      >
        Filtros
      </button>
      <button
        class="boton-vista"
        :style="`${
          vista_mostrada == 'buscador_judicial'
            ? 'background-color: #72CDE9'
            : 'background-color: #f4f5f6'
        }`"
        type="button"
        @click="setVista('buscador_judicial')"
      >
        Buscador
      </button>
      <button
        class="boton-vista"
        :style="`${
          vista_mostrada == 'ver_todo'
            ? 'background-color: #72CDE9'
            : 'background-color: #f4f5f6'
        }`"
        type="button"
        @click="setVista('ver_todo')"
      >
        Ver todo
      </button>
    </div>
  </div>

  <div class="main-content">
    <!-- Esta sección es la encargada de controlar los datos que se pasan al resto de los elementos -->
    <div
      class="side-bar"
      id="side-bar"
      @mouseover="abrirSidebar"
      @mouseout="cerrarSidebar"
    >
      <div class="contenedor-botones-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'suprema_corte'
              ? 'background-color: #72CDE9'
              : 'background-color: #f4f5f6'
          }`"
          type="button"
          @click="setData('suprema_corte')"
        >
          Suprema Corte de Justicia
        </button>
        <button
          class="boton-oragno"
          :style="`${
            organo == 'sala_superior'
              ? 'background-color: #72CDE9'
              : 'background-color: #f4f5f6'
          }`"
          type="button"
          @click="setData('sala_superior')"
        >
          Sala Superior
        </button>
        <button
          class="boton-oragno"
          :style="`${
            organo == 'sala_regional'
              ? 'background-color: #72CDE9'
              : 'background-color: #f4f5f6'
          }`"
          type="button"
          @click="setData('sala_regional')"
        >
          Sala Regional
        </button>
        <button
          class="boton-oragno"
          :style="`${
            organo == 'tribunal_disciplinario'
              ? 'background-color: #72CDE9'
              : 'background-color: #f4f5f6'
          }`"
          type="button"
          @click="setData('tribunal_disciplinario')"
        >
          Tribunal Disciplinario
        </button>
        <button
          class="boton-oragno"
          :style="`${
            organo == 'magistraturas_circuito'
              ? 'background-color: #72CDE9'
              : 'background-color: #f4f5f6'
          }`"
          type="button"
          @click="setData('magistraturas_circuito')"
        >
          Magistratura de Circuito
        </button>
        <button
          class="boton-oragno"
          :style="`${
            organo == 'juzgadores_distrito'
              ? 'background-color: #72CDE9'
              : 'background-color: #f4f5f6'
          }`"
          type="button"
          @click="setData('juzgadores_distrito')"
        >
          Juzgadores de distrito
        </button>
      </div>
    </div>

    <!-- Estas son las vistas posibles -->
    <div class="contenedor-vista" id="contenedro-vista">
      <DescripcionInicio v-if="vista_mostrada == 'descripccion_inicio'" />
      <HerramientaFiltros v-if="vista_mostrada == 'herramienta_filtros'" />
      <BuscadorJudicial v-if="vista_mostrada == 'buscador_judicial'" />
      <VerTodo v-if="vista_mostrada == 'ver_todo'" />
    </div>
  </div>
</template>

<script setup>
// Llamamos las funciones y stores de vue
import { ref, onMounted, watch } from "vue";
import { useDataOrgano } from "./assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "./assets/stores/OrganoSeleccionado.js";
// Llamamos la info de nuestros componentes
import DescripcionInicio from "./components/DescripcionInicio.vue";
import HerramientaFiltros from "./components/HerramientaFiltros.vue";
import BuscadorJudicial from "./components/BuscadorJudicial.vue";
import VerTodo from "./components/VerTodo.vue";

// Definimos y llamamos como variables globales los datos
// y la seleccion del organo
const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

// Definimos otras variables que nos van a ayudar
const vista_mostrada = ref("descripccion_inicio");

// Cada vez que se presione el botón de alguno de los organos se actualizan las dos variables globales
function setData(x) {
  dataStore.updateOrgano(x);
  organoStore.updateOrgano(x);
}

// Hacemos una función para seleccionar la vista
function setVista(x) {
  vista_mostrada.value = x;
}

// Creamos dos funciones para el comportamiento de la sidebar
function abrirSidebar() {
  document.getElementById("side-bar").style.width = "200px";
}
function cerrarSidebar() {
  document.getElementById("side-bar").style.width = "12%";
}

onMounted(() => {
  console.log("Se cargó la app");
});
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
});
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
}

.nav-bar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 12%;
}
.main-content {
  /*margin-top: 7%;*/
  margin-top: 6%;
  padding: 5px;
  display: flex;
}
.contenedor-botones-vista {
  background-color: #555a62;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.boton-vista {
  margin: 5px;
  padding: 15px 32px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  background-color: #f4f5f6;
}

.side-bar {
  position: fixed;
  z-index: 1;
  top: 13%;
  left: 0;
  width: 12%;
  height: 88%;
  overflow-x: hidden;
  background-color: #555a62;
  transition: 0.5s;
}

.contenedor-botones-organo {
  height: 98%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.boton-oragno {
  margin: 5px;
  padding: 15px 32px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  background-color: #f4f5f6;
}

.contenedor-vista {
  /*margin: 4% 3px 3px 13%;*/
  margin: 0% 3px 3px 13%;
  padding: 0px 5px;
}
</style>
