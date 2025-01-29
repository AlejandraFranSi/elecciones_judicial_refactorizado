<template>
  <div>
    <h1>Esta es la vista con los filtros</h1>
    <p>{{ data.length }}, {{ organo }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";

const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

onMounted(() => {
  console.log("Se cargó la herramienta de los filtros");
});
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
});
</script>

<style scoped></style>
