<template>
  <h1>{{ descripciones[organo]["titulo"] }}</h1>
  <div>
    {{ descripciones[organo]["descripcion"] }}
  </div>
  <h3>No de cargos: {{ descripciones[organo]["cargos"] }}</h3>
  <h3>No de aspirantes: {{ descripciones[organo]["candidaturas"] }}</h3>
</template>

<script setup>
import { ref, /*onMounted,*/ watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";

const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

const descripciones = ref({
  suprema_corte: {
    titulo: "Suprema Corte de Justicia",
    descripcion:
      "La suprema corte lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "81",
    candidaturas: "394",
  },
  sala_superior: {
    titulo: "Sala Superior",
    descripcion:
      "La sala superior lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "9",
    candidaturas: "81",
  },
  sala_regional: {
    titulo: "Salas Regionales",
    descripcion:
      "Las salas regionales lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "15",
    candidaturas: "90",
  },
  tribunal_disciplinario: {
    titulo: "Tribunal disciplinario",
    descripcion:
      "El tribunal disciplinario lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "5",
    candidaturas: "45",
  },
  magistraturas_circuito: {
    titulo: "Magistraturas de Circuito",
    descripcion:
      "Las magistraturas de circuito lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "464",
    candidaturas: "850",
  },
  juzgadores_distrito: {
    titulo: "Juzgadores de distrito",
    descripcion:
      "Los juzgadores de distrito lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cargos: "386",
    candidaturas: "1000",
  },
});

/* onMounted(() => {
  console.log("Se cargó la descripción del inicio");
}); */
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
});
</script>

<style scoped></style>
