<template>
  <!-- Esta sección es la encargada de controlar los datos que se pasan al resto de los elementos -->
  <div class="nav-bar" id="nav-bar">
    <div class="contenedor-botones-organo">
      <button
        class="boton-oragno"
        :style="`${organo == 'suprema_corte' ? 'opacity: 1' : 'opacity: 0.5'}`"
        type="button"
        @click="setData('suprema_corte')"
      >
        Suprema Corte de Justicia
      </button>

      <button
        class="boton-oragno"
        :style="`${organo == 'sala_superior' ? 'opacity: 1' : 'opacity: 0.5'}`"
        type="button"
        @click="setData('sala_superior')"
      >
        Sala Superior
      </button>

      <button
        class="boton-oragno"
        :style="`${organo == 'sala_regional' ? 'opacity: 1' : 'opacity: 0.5'}`"
        type="button"
        @click="setData('sala_regional')"
      >
        Sala Regional
      </button>

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
    // Las dimensiones para la versión extendida
    if (window.innerWidth < 680) {
      document.getElementById("side-bar").style.width = "110px";
    } else if (window.innerWidth < 1200) {
      document.getElementById("side-bar").style.width = "110px";
    } else {
      document.getElementById("side-bar").style.width = "150px";
    }
    mini_sidebar.value = true;
  } else {
    // Las dimensiones para la versión chiquita
    if (window.innerWidth < 680) {
      document.getElementById("side-bar").style.width = "10%";
    } else if (window.innerWidth < 1200) {
      document.getElementById("side-bar").style.width = "5%";
    } else {
      document.getElementById("side-bar").style.width = "3%";
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
  padding: 3px;
}
.side-bar {
  position: fixed;
  z-index: 1;
  top: 93px;
  left: 0;
  width: 3%;
  height: 91%;
  overflow-x: hidden;
  overflow-x: hidden;
  background-color: #42474c;
  /*background-color: pink;*/
  transition: 0.5s;
}
.main-content {
  margin-top: 95px;
  margin-left: 3.5%;
  margin-right: 10px;
  display: flex;
  /*background-color: cyan;*/
}
.contenedor-botones-vista {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 10px;
  margin: 5px;
  /*background-color: lawngreen;*/
}
.contenedor-botones-organo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  background-color: #42474c;
  /*background-color: blue;*/
}

.boton-oragno {
  width: 16%;
  height: 80px;
  border: none;
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
  width: 100%;
  min-height: 30px;
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
  margin: 0px;
  padding: 0px;
  /*background-color: plum;*/
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
  top: 10%;
  left: 10%;
  height: 80%;
  width: 80%;
  background-color: white;
  /*background-color: red;*/
}

/* Para tableta */
@media (max-width: 1200px) {
  .side-bar {
    width: 5%;
  }
  .main-content {
    margin-left: 6%;
    margin-right: 10px;
  }
  .contenedor-botones-vista {
    margin: 5px 2px;
  }
}

/* Para celular */
@media (max-width: 680px) {
  .boton-oragno {
    width: 50%;
    height: 35px;
    font-size: 15px;
  }
  .side-bar {
    top: 115px;
    width: 10%;
  }

  .main-content {
    margin-left: 11%;
    margin-right: 3px;
  }
}
</style>
