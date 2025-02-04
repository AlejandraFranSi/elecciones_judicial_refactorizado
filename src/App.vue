<template>
  <!-- Esta sección es la encargada de controlar los datos que se pasan al resto de los elementos -->
  <div class="nav-bar" id="nav-bar">
    <div class="contenedor-botones-organo">
      <div class="div-boton-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'suprema_corte' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setData('suprema_corte')"
        >
          Suprema Corte de Justicia
        </button>
      </div>

      <div class="div-boton-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'sala_superior' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setData('sala_superior')"
        >
          Sala Superior
        </button>
      </div>

      <div class="div-boton-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'sala_regional' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setData('sala_regional')"
        >
          Sala Regional
        </button>
      </div>

      <div class="div-boton-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'tribunal_disciplinario' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setData('tribunal_disciplinario')"
        >
          Tribunal Disciplinario
        </button>
      </div>

      <div class="div-boton-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'magistraturas_circuito' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setData('magistraturas_circuito')"
        >
          Magistratura de Circuito
        </button>
      </div>

      <div class="div-boton-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'juzgadores_distrito' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setData('juzgadores_distrito')"
        >
          Juzgadores de distrito
        </button>
      </div>
    </div>
  </div>

  <div class="main-content">
    <!-- Esta sección es la encargada de controlar la vista -->
    <div
      class="side-bar"
      id="side-bar"
      @mouseover="toggleSidebar"
      @mouseout="toggleSidebar"
    >
      <div class="contenedor-botones-vista">
        <button
          class="boton-vista"
          :style="`${
            vista_mostrada == 'descripccion_inicio'
              ? 'opacity: 1'
              : 'opacity: 0.5'
          }`"
          type="button"
          @click="setVista('descripccion_inicio')"
        >
          <img src="../src/assets/img/home_icon.png" height="16" width="16" />
          <span :style="`${mini_sidebar ? 'display: block' : 'display: none'}`">
            Inicio
          </span>
        </button>
        <button
          class="boton-vista"
          :style="`${
            vista_mostrada == 'herramienta_filtros'
              ? 'opacity: 1'
              : 'opacity: 0.5'
          }`"
          type="button"
          @click="setVista('herramienta_filtros')"
        >
          <img src="../src/assets/img/filter_icon.png" height="16" width="16" />
          <span :style="`${mini_sidebar ? 'display: block' : 'display: none'}`">
            Filtrar
          </span>
        </button>
        <button
          class="boton-vista"
          :style="`${
            vista_mostrada == 'buscador_judicial'
              ? 'opacity: 1'
              : 'opacity: 0.5'
          }`"
          type="button"
          @click="setVista('buscador_judicial')"
        >
          <img src="../src/assets/img/search_icon.png" height="16" width="16" />
          <span :style="`${mini_sidebar ? 'display: block' : 'display: none'}`">
            Buscar
          </span>
        </button>
        <button
          class="boton-vista"
          :style="`${
            vista_mostrada == 'ver_todo' ? 'opacity: 1' : 'opacity: 0.5'
          }`"
          type="button"
          @click="setVista('ver_todo')"
        >
          <img src="../src/assets/img/all_icon.png" height="16" width="16" />
          <span :style="`${mini_sidebar ? 'display: block' : 'display: none'}`">
            Ver todo
          </span>
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
const mini_sidebar = ref(false);

// Cada vez que se presione el botón de alguno de los organos se actualizan las dos variables globales
function setData(x) {
  dataStore.updateOrgano(x);
  organoStore.updateOrgano(x);
}

// Hacemos una función para seleccionar la vista
function setVista(x) {
  vista_mostrada.value = x;
  if (window.innerWidth < 850) {
    document.getElementById("side-bar").style.width = "10%";
    mini_sidebar.value = false;
  }
}

// Creamos dos funciones para el comportamiento de la sidebar
function toggleSidebar() {
  if (mini_sidebar.value == false) {
    if (window.innerWidth < 850) {
      document.getElementById("side-bar").style.width = "120px";
    } else {
      document.getElementById("side-bar").style.width = "150px";
    }
    mini_sidebar.value = true;
  } else {
    if (window.innerWidth < 850) {
      document.getElementById("side-bar").style.width = "10%";
    } else {
      document.getElementById("side-bar").style.width = "5%";
    }
    mini_sidebar.value = false;
  }
}
/* function abrirSidebar() {
  if (window.innerWidth < 850) {
    document.getElementById("side-bar").style.width = "120px";
  } else {
    document.getElementById("side-bar").style.width = "150px";
  }
  mini_sidebar.value = true;
}*/
/* function cerrarSidebar() {
  if (window.innerWidth < 850) {
    document.getElementById("side-bar").style.width = "10%";
  } else {
    document.getElementById("side-bar").style.width = "5%";
  }
  mini_sidebar.value = false; 
}*/

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
  background-color: #42474c;
  /*background-color: orange;*/
  margin: auto;
  padding-top: 3px;
}
.side-bar {
  position: fixed;
  z-index: 1;
  top: clamp(3%, 12%, 15%);
  left: 0;
  min-width: 3%;
  max-width: 4%;
  height: 88%;
  overflow-x: hidden;
  background-color: #42474c;
  /*background-color: pink;*/
  transition: 0.5s;
  overflow-x: hidden;
}
.main-content {
  margin-top: clamp(50px, 80px, 100px);
  margin-left: clamp(20px, 80px, 120px);
  display: flex;
  /*background-color: cyan;*/
}
.contenedor-botones-vista {
  /*background-color: #42474c;*/
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 10px;
}
.contenedor-botones-organo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  background-color: #42474c;
  min-height: 12%;
  max-height: 300px;
  /*background-color: blue;*/
  min-height: 80px;
}
.div-boton-organo {
  /*background-color: green;*/
  text-align: left;
  height: 80px;
  width: 16%;
  margin: auto;
  padding: 0px;
}
.boton-oragno {
  width: 100%;
  height: 100%;
  /*padding: 5px 10px;*/
  border: none;
  /*border-radius: 10px;*/
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  background-color: #42474c;
  /*background-color: red;*/
  color: #f4f5f6;
  font-weight: bold;
}
.boton-vista {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  margin: 5px;
  width: 100%;
  min-height: 30px;
  /*padding: 15px 32px;*/
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  background-color: #42474c;
  color: #f4f5f6;
}

.contenedor-vista {
  width: 100%;
  /*background-color: plum;*/
  margin: 10px;
}
.fondo-popup {
  position: fixed;
  z-index: 1;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  opacity: 0.8;
  background-color: black;
}
.popup {
  position: fixed;
  z-index: 2;
  top: clamp(10%, 18%, 50%);
  left: 10%;
  max-height: 78%;
  width: 80%;
  background-color: white;
}
@media (max-width: 850px) {
  .side-bar {
    min-width: 5%;
    max-width: 10%;
    top: clamp(5%, 9%, 12%);
  }
  .main-content {
    margin-left: clamp(30px, 65px, 100px);
  }
  .div-boton-organo {
    width: 49%;
    height: 25px;
  }
  .boton-oragno {
    font-size: 12px;
  }
  .contenedor-vista {
    /*margin: 16% 3px 3px 10%;*/
  }
  .popup {
    top: 10%;
    height: 80%;
  }
}
</style>
