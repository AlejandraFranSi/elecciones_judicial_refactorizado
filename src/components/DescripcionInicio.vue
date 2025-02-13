<template>
  <div
    class="contenedor-inicio"
    :class="common_switch ? 'vista-animada-a' : 'vista-animada-b'"
  >
    <h1>{{ descripciones[organo]["titulo"] }}</h1>
    <div class="descripcion-inicio">
      {{ descripciones[organo]["descripcion"] }}
    </div>

    <div class="contenedor-numeralia">
      <div class="numeralia">
        <h3>
          Número de cargos: <br />
          <span class="numero-personas">
            {{ descripciones[organo]["cargos"] }}
          </span>
        </h3>
      </div>
      <div class="numeralia">
        <h3>
          Número de aspirantes: <br />
          <span class="numero-personas">
            {{ descripciones[organo]["candidaturas"] }}
          </span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
// Llamamos el paquete de animaciones
import "animate.css";
// Ahora las cosas que necesitamos de vue
import { ref, /*onMounted,*/ watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";

const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

const descripciones = ref({
  suprema_corte: {
    titulo: "Suprema Corte de Justicia de la Nación",
    descripcion:
      "La suprema corte lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "81",
    candidaturas: "394",
  },
  sala_superior: {
    titulo:
      "Sala Superior del Tribunal Electoral del Poder Judicial de la Federación",
    descripcion:
      "La sala superior lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "9",
    candidaturas: "81",
  },
  sala_regional: {
    titulo:
      "Sala Regional del Tribunal Electoral del Poder Judicial de la Federación",
    descripcion:
      "Las salas regionales lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "15",
    candidaturas: "90",
  },
  tribunal_disciplinario: {
    titulo: "Tribunal de Disciplina Judicial",
    descripcion:
      "El tribunal disciplinario lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "5",
    candidaturas: "45",
  },
  magistraturas_circuito: {
    titulo: "Tribunales Colegiados de Circuito",
    descripcion:
      "Las magistraturas de circuito lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "464",
    candidaturas: "850",
  },
  juzgadores_distrito: {
    titulo: "Juzgados de Distrito",
    descripcion:
      "Los juzgadores de distrito lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "386",
    candidaturas: "1000",
  },
});

const common_switch = ref(true);
/* onMounted(() => {
  console.log("Se cargó la descripción del inicio");
}); */
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
  common_switch.value = !common_switch.value;
});
</script>

<style scoped>
h1 {
  font-size: 64px;
  /*background-color: blue;*/
  margin-bottom: 0px;
}

.contenedor-inicio {
  /*background-color: orange;*/
  margin-top: -30px;
  margin-left: 10%;
  width: 80%;
}
.descripcion-inicio {
  /*background-color: cyan;*/
  margin: 10px 0px 20px 0px;
  font-size: 17px;
}
.contenedor-numeralia {
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  margin-top: 40px;
}
.numeralia {
  font-family: Giorgio;
  /*background-color: #f7e7d8;*/
  background-color: #e07010;
  color: white;
  width: 25%;
  padding: 5px 20px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
.numero-personas {
  /*background-color: pink;*/
  padding: 5px;
  font-size: 40px;
  /*color: #ca6d16;*/
}
.vista-animada-a {
  /*background-color: orange;*/
  animation: fadeInDown;
  animation-duration: 0.5s;
}
.vista-animada-b {
  /*background-color: pink;*/
  animation: slideInDown 0.5s, fadeIn 0.5s;
  /*animation-duration: 1s;*/
}
@media (max-width: 900px) {
  .contenedor-inicio {
    /*margin-top: -35px;*/
    margin-left: 0px;
    width: 100%;
  }
}
@media (max-width: 550px) {
  .numeralia {
    width: 60%;
    margin: 0px 0px 30px 0px;
  }
}
</style>
