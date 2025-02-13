<template>
  <!-- Esta sección es la encargada de controlar los datos que se pasan al resto de los elementos -->
  <div class="nav-bar" id="nav-bar">
    <div class="contenedor-botones-navbar">
      <button
        class="boton-home"
        :style="`${organo == 'caratula' ? 'opacity: 1' : 'opacity: 0.7'}`"
        type="button"
        @click="setCaratula"
      >
        <img class="icono-home" src="./assets/img/Copia de home_icon.png" />
        <!--         <div class="titulo-home">Nombre del proyecto</div> -->
      </button>

      <div class="contenedor-botones-organo">
        <button
          class="boton-oragno"
          :style="`${
            organo == 'suprema_corte' ? 'opacity: 1' : 'opacity: 0.7'
          }`"
          type="button"
          @click="setData('suprema_corte')"
        >
          Suprema Corte de Justicia de la Nación
        </button>

        <button
          class="boton-oragno"
          :style="`${
            organo == 'sala_superior' ? 'opacity: 1' : 'opacity: 0.7'
          }`"
          type="button"
          @click="setData('sala_superior')"
        >
          Sala Superior del TEPJF
        </button>

        <button
          class="boton-oragno"
          :style="`${
            organo == 'sala_regional' ? 'opacity: 1' : 'opacity: 0.7'
          }`"
          type="button"
          @click="setData('sala_regional')"
        >
          Sala Regional del TEPJF
        </button>

        <button
          class="boton-oragno"
          :style="`${
            organo == 'tribunal_disciplinario' ? 'opacity: 1' : 'opacity: 0.7'
          }`"
          type="button"
          @click="setData('tribunal_disciplinario')"
        >
          Tribunal de Disciplina Judicial
        </button>

        <button
          class="boton-oragno"
          :style="`${
            organo == 'magistraturas_circuito' ? 'opacity: 1' : 'opacity: 0.7'
          }`"
          type="button"
          @click="setData('magistraturas_circuito')"
        >
          Tribunales Colegiados de Circuito
        </button>

        <button
          class="boton-oragno"
          :style="`${
            organo == 'juzgadores_distrito' ? 'opacity: 1' : 'opacity: 0.7'
          }`"
          type="button"
          @click="setData('juzgadores_distrito')"
        >
          Juzgados de Distrito
        </button>
      </div>
    </div>
  </div>

  <div class="main-content">
    <!-- Esta sección es la encargada de controlar la vista -->
    <div
      class="side-bar"
      id="side-bar"
      v-if="vista_mostrada != 'caratula'"
      @mouseenter="toggleSidebar"
      @mouseleave="toggleSidebar"
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
          <img
            src="../src/assets/img/launch_icon.png"
            class="side-icon"
            :style="`${!mini_sidebar ? 'display: none' : 'display: block'}`"
          />
          <img
            src="../src/assets/img/launch_icon.png"
            class="side-icon"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          />

          <span
            class="button-tittle"
            id="span-inicio"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          >
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
          <img
            src="../src/assets/img/filter_icon.png"
            class="side-icon"
            :style="`${!mini_sidebar ? 'display: none' : 'display: block'}`"
          />
          <img
            src="../src/assets/img/filter_icon.png"
            class="side-icon"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          />
          <span
            class="button-tittle"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          >
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
          <img
            src="../src/assets/img/search_icon.png"
            class="side-icon"
            :style="`${!mini_sidebar ? 'display: none' : 'display: block'}`"
          />
          <img
            src="../src/assets/img/search_icon.png"
            class="side-icon"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          />

          <span
            class="button-tittle"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          >
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
          <img
            src="../src/assets/img/presentation_icon.png"
            class="side-icon"
            :style="`${!mini_sidebar ? 'display: none' : 'display: block'}`"
          />
          <img
            src="../src/assets/img/presentation_icon.png"
            class="side-icon"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          />
          <span
            class="button-tittle"
            :style="`${mini_sidebar ? 'display: none' : 'display: block'}`"
          >
            Ver todo
          </span>
        </button>
      </div>
    </div>

    <!-- Estas son las vistas posibles -->
    <div class="contenedor-vista" id="contenedor-vista">
      <CaratulaInicial id="caratula" v-if="vista_mostrada == 'caratula'" />
      <DescripcionInicio v-if="vista_mostrada == 'descripccion_inicio'" />
      <HerramientaFiltros v-if="vista_mostrada == 'herramienta_filtros'" />
      <BuscadorJudicial v-if="vista_mostrada == 'buscador_judicial'" />
      <VerTodo v-if="vista_mostrada == 'ver_todo'" />
    </div>
  </div>
</template>

<script setup>
// Llamamos el paquete de animaciones
import "animate.css";
// Llamamos las funciones y stores de vue
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useDataOrgano } from "./assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "./assets/stores/OrganoSeleccionado.js";
import { useVistaMostrada } from "./assets/stores/VistaMostrada.js";
// Llamamos la info de nuestros componentes
import CaratulaInicial from "./components/CaratulaInicial.vue";
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
const vistaStore = useVistaMostrada();
const vista_mostrada = ref(vistaStore.vista_mostrada);

// Definimos otras variables que nos van a ayudar
const mini_sidebar = ref(true);
//const show_button_names = ref();

// Cada vez que se presione el botón de alguno de los organos se actualizan las dos variables globales
function setData(x) {
  dataStore.updateOrgano(x);
  organoStore.updateOrgano(x);
  if (vista_mostrada.value == "caratula") {
    vistaStore.updateVista("descripccion_inicio");
  }
}

// Hacemos una función para seleccionar la vista
function setVista(x) {
  vistaStore.updateVista(x);
  //console.log(vista_mostrada.value);
}

function setCaratula() {
  dataStore.updateOrgano("caratula");
  organoStore.updateOrgano("caratula");
  vistaStore.updateVista("caratula");
}

// Creamos la funcion para que se despliegue el sidebar
function toggleSidebar() {
  if (window.innerWidth > 900) {
    if (mini_sidebar.value == true) {
      if (900 < window.innerWidth < 1000) {
        document.getElementById("side-bar").style.width = "130px";
      } else {
        document.getElementById("side-bar").style.width = "150px";
      }
      mini_sidebar.value = false;
      /*       setTimeout(() => {
        mini_sidebar.value = false;
      }, 50); */
    } else {
      if (window.innerWidth <= 460) {
        document.getElementById("side-bar").style.width = "12%";
      } else {
        if (window.innerWidth <= 560) {
          document.getElementById("side-bar").style.width = "11%";
        } else if (window.innerWidth <= 705) {
          document.getElementById("side-bar").style.width = "9%";
        } else if (window.innerWidth <= 985) {
          document.getElementById("side-bar").style.width = "7%";
        } else if (window.innerWidth <= 1205) {
          document.getElementById("side-bar").style.width = "5%";
        } else {
          document.getElementById("side-bar").style.width = "3%";
        }
      }
      mini_sidebar.value = true;
    }
  } else {
    mini_sidebar.value = false;
  }
}

function setSize() {
  if (window.innerWidth > 900) {
    mini_sidebar.value = true;
  } else {
    mini_sidebar.value = false;
  }
}
onMounted(() => {
  //console.log("Se cargó la app");
  setSize();
  window.addEventListener("resize", setSize);
});
onUnmounted(() => {
  window.removeEventListener("resize", setSize);
});

// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  // Cambiamos los datos
  //console.log("cambiaron los datos");
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
});
watch(vistaStore, () => {
  vista_mostrada.value = vistaStore.vista_mostrada;
});
</script>

<style>
@font-face {
  font-family: WorkSans;
  font-display: swap;
  src: url("./assets/fonts/Work_Sans/WorkSans-VariableFont_wght.ttf");
}

@font-face {
  font-family: Giorgio;
  font-style: bold;
  font-display: swap;
  src: url("./assets/fonts/giorgio/Giorgio-Sans-Bold.woff");
}
@font-face {
  font-family: Giorgio;
  font-style: normal;
  font-display: swap;
  src: url("./assets/fonts/giorgio/Giorgio-Sans-Regular.woff");
}
#app {
  font-family: WorkSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
}
body {
  margin: 0px;
  padding: 0px;
  background-color: #f5f5f5;
  font-family: Giorgio;
  letter-spacing: 1px;
}

.nav-bar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0068a2;
  /*background-color: #42474c;*/
  /*background-color: orange;*/
  padding: 3px;
}

.contenedor-botones-navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-around;
  /*background-color: lime;*/
  width: 99.5%;
  height: 80px;
}
.contenedor-botones-organo {
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-around;
  gap: 0px 10px;
  /*background-color: red;*/
}

.boton-oragno {
  height: 80px;
  border: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  background-color: #0068a2;
  /*background-color: grey;*/
  color: #f4f5f6;
  padding: 0px 5px;
  white-space: normal;
  opacity: 0.4;
}
.boton-home {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  background-color: #0068a2;
  /*background-color: plum;*/
  border: none;
  cursor: pointer;
  padding: 0px 30px;
  color: #f4f5f6;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  height: 80px;
  width: 5%;
  /*gap: 8px;*/
}
.icono-home {
  max-height: 60px;
  object-fit: contain;
  /*background-color: orange;*/
}
/* .titulo-home {
  width: 73%;
  background-color: cyan;
  text-align: left;
  justify-content: center;
  margin-top: 20px;
  margin-left: 8px;
  font-size: 20px;
} */

.side-bar {
  position: fixed;
  z-index: 1;
  top: 120px;
  left: 0;
  width: 3%;
  height: 265px;
  overflow-x: hidden;
  overflow-x: hidden;
  /*background-color: #1d69a2;*/
  /*background-color: #42474c;*/
  background-color: #a7cced;
  /*background-color: lime;*/
  transition: 0.5s;
}

.contenedor-botones-vista {
  display: flex;
  flex-wrap: wrap;
  height: 250px;
  margin-left: -10px;
  justify-content: center;
  align-content: space-around;
  background-color: #a7cced;
  /*background-color: pink;*/
}

.boton-vista {
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  background-color: #a7cced;
  /*background-color: #42474c;*/
  /*background-color: red;*/
  color: #42474c;
  margin-left: 10%;
  transition: 0.5s;
}
.side-icon {
  /*background-color: cyan;*/
  height: 30px;
  object-fit: contain;
  transition: 0.5s;
  animation: fadeIn;
  animation-duration: 2s;
}
.button-tittle {
  /*background-color: blue;*/
  margin-left: 8px;
  margin-top: 8px;
  animation: fadeIn;
  animation-duration: 2s;
}

.main-content {
  margin-top: 95px;
  margin-left: 3%;
  margin-right: 10px;
  display: flex;
  /*background-color: plum;*/
}

.contenedor-vista {
  width: 100%;
  margin: 0px;
  padding: 0px;
  /*background-color: orange;*/
}

.fondo-popup {
  position: fixed;
  z-index: 1;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  opacity: 0.9;
  background-color: black;
}
.popup {
  position: fixed;
  z-index: 2;
  top: 5%;
  left: 15%;
  height: 90%;
  width: 70%;
  border: none;
  border: none;
  border-radius: 15px;
  /*background-color: white;*/
  /*background-color: red;*/
}
@media (max-width: 1530px) {
  .contenedor-botones-organo {
    gap: 0px 5px;
  }
  .boton-oragno {
    height: 80px;
    width: 16.2%;
  }
}

/* Aqui se hace un cambio en el ancho del sidebar */
@media (max-width: 1205px) {
  .contenedor-botones-organo {
    width: 91%;
  }
  .boton-oragno {
    height: 80px;
  }
  .boton-home {
    width: 50px;
    margin-left: 10px;
  }
  .side-bar {
    width: 5%;
  }
  .main-content {
    margin-left: 5%;
  }
}

/* Aquí se hace otro cambio de tamaño del sidebar */
@media (max-width: 985px) {
  .contenedor-botones-organo {
    width: 90%;
  }
  .boton-oragno {
    width: 15%;
  }
  .side-bar {
    width: 7%;
  }
  .main-content {
    margin-left: 7%;
  }
}

@media (max-width: 900px) {
  .button-tittle {
    margin-top: 0px;
  }
  .main-content {
    margin-left: 8%;
  }
}

/* Aquí es donde entran los botones en dos columnas */
/* También entra otro cambio de tamaño en el sidebar */
@media (max-width: 705px) {
  .contenedor-botones-navbar {
    justify-content: center;
    height: 150px;
  }
  .contenedor-botones-organo {
    height: 150px;
    gap: 0px;
    justify-content: center;
  }
  .boton-oragno {
    height: 50px;
    width: 49.5%;
  }
  .boton-home {
    width: 50px;
    height: 150px;
    padding: 5px;
  }
  .icono-home {
    height: 50px;
  }
  .side-bar {
    top: 170px;
    width: 9%;
  }
  .main-content {
    margin-top: 150px;
    margin-left: 10%;
  }
}

@media (max-width: 610px) {
  .contenedor-botones-organo {
    width: 89%;
    gap: 0px;
    justify-content: center;
    opacity: 0.5;
  }
  .boton-home {
    width: 45px;
    padding: 0px;
  }
  .icono-home {
    height: 45px;
  }
}

/* Aqui entra otro cambio de tamaño  en el sidebar*/
@media (max-width: 560px) {
  .boton-home {
    width: 40px;
    padding: 0px;
    margin-left: 0px;
  }
  .icono-home {
    height: 40px;
  }

  .side-bar {
    width: 11%;
  }
  .main-content {
    margin-left: 12%;
  }
}

/* Aquí entra otro cambio en el tamaño del sidebar */
@media (max-width: 460px) {
  .contenedor-botones-organo {
    width: 87.4%;
  }
  .side-bar {
    width: 12%;
  }
  .main-content {
    margin-left: 13%;
  }
}
</style>
