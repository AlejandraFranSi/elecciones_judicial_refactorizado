<template>
  <div>
    <h3>
      Los nombres están ordenados alfabéticamente por el apellido paterno. Da
      click en el nombre del o la candidata de quien desees conocer más
      información
    </h3>
  </div>
  <!--  Se genera programáticamente una caja por letra del alfabeto y, dentro de esa caga, 
  un botón con el nombre las y los candidatos. Al hacer click en estos botones abre un popup</h3>-->
  <div>
    <div
      class="contenedor-letra"
      v-for="(letra, index) in abecedario"
      :key="index"
    >
      <div class="header-letra">
        {{ letra }}
      </div>
      <div class="contenedor-personas">
        <button
          class="rectangulo-persona"
          v-for="(persona, index) in datos_ordenados[letra]"
          :key="index"
          @click="showPopUpInfo(persona)"
        >
          {{ persona.apellido_paterno + " " + persona.nombres }}
        </button>
      </div>
    </div>
  </div>

  <!--  Estas son las cajas correspondientes al popup de cada candidate -->
  <div
    v-if="show_popup == true"
    class="fondo-popup"
    id="fondo-popup"
    @click="show_popup = false"
  ></div>
  <div v-if="show_popup == true" class="popup">
    <PopUp :datos_candidate="datos_popup" />

    <span class="close" @click="show_popup = false">&times;</span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";
import PopUp from "./PopUp.vue";

// Llamamos nuestras variables globales
const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

// Creamos las otras variables que nos van a ayudar a mostrar la info
const show_popup = ref(false);
const datos_popup = ref();
const datos_ordenados = ref({});
const abecedario = ref([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]);

function ordenar_datos() {
  // Creamos una diccionario de datos donde las claves son las letras del abecedario y
  // los valores son los candidatos cuyo apellido paterno inician con esa letra
  for (let i = 0; i < abecedario.value.length; i++) {
    let lista_elementos = [];
    for (let m = 0; m < data.value.length; m++) {
      if (data.value[m]["apellido_paterno"][0] == abecedario.value[i]) {
        lista_elementos.push(data.value[m]);
      }
    }
    datos_ordenados.value[abecedario.value[i]] = lista_elementos;
  }
  //console.log(datos_ordenados.value);
}

// Esta función es para hacer que aparezca la ventana con la información del candidato seleccionado
function showPopUpInfo(x) {
  show_popup.value = true;
  datos_popup.value = x;
  console.log(x);
}

onMounted(() => {
  ordenar_datos();
});
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
  ordenar_datos();
});
</script>

<style scoped>
.contenedor-letra {
  padding: 0px 0px;
  margin: 15px 0px;
}

.header-letra {
  background-color: #67adcd;
  padding: 5px 10px;
  margin: 0px 0px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}

.contenedor-personas {
  background-color: #e9ebed;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  gap: 5px;
  margin: 0px 0px;
  padding: 5px;
}
.rectangulo-persona {
  background-color: #a3cde0;
  color: #555a62;
  /*color: #dde0e3;*/
  margin: 5px;
  padding: 5px 8px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.fondo-popup {
  position: fixed;
  z-index: 1;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  background-color: black;
}
.popup {
  position: fixed;
  z-index: 2;
  top: 5%;
  left: 5%;
  height: 90%;
  width: 90%;
  background-color: white;
}
</style>
