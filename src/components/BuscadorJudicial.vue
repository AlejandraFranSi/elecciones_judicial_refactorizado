<template>
  <div>
    <h1>Esta es la vista del buscador</h1>
    <p>{{ data.length }}, {{ organo }}</p>
  </div>

  <div class="contenedor-judicial">
    <!-- En esta parte se recibe el input del usuario -->
    <div>
      <h3>Ingrese el nombre o apellido de la persona a la que busca</h3>
      <div class="contenedor-buscador">
        <label for="name">Escriba el nombre: </label>
        <input type="text" id="name" name="name" v-model="candidate_buscade" />
      </div>
      <button @click="buscar_persona()">Buscar</button>
    </div>

    <!-- En esta parte indica que la búsqueda no fue valida -->
    <div class="alert" v-if="input_invalido">Ingresa una búsqueda válida</div>

    <!-- En esta parte se muestran los resultados de la búsqueda -->
    <div class="resultados" v-if="mostrar_resultados == 'si'">
      <h3>Resultados</h3>
      <div v-for="(entrada, index) in datos_resultados" :key="index">
        <button @click="showPopUpInfo(entrada)">
          {{ entrada["nombres"] + " " + entrada["apellido_paterno"] }}
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

// Const llamamos nuestras variables globales
const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

// Ahora las otras variables que controlan los datos
const datos_resultados = ref([]);
const candidate_buscade = ref("");
const mostrar_resultados = ref("no");
const input_invalido = ref(false);

const show_popup = ref(false);
const datos_popup = ref();

function buscar_persona() {
  console.log(typeof candidate_buscade.value);
  // Tomamos el inpunt del lado del usuario y cramos una lista
  // con las distintas palabras que buscadas separadas por un espacio
  let lista_palabras = candidate_buscade.value.split(" ");
  lista_palabras = [...new Set(lista_palabras)];
  console.log(lista_palabras);
  if (candidate_buscade.value.length === 0) {
    // Si el input es una cadena vacía
    input_invalido.value = true;
  } else if (lista_palabras[0] == "") {
    // Si el input es una cadena de espacios vacíos
    input_invalido.value = true;
  } else if (typeof candidate_buscade.value != "string") {
    // Si el input es numerico
    input_invalido.value = true;
  } else {
    input_invalido.value = false;

    // Hacemos que aparezca el div de resultados
    mostrar_resultados.value = "si";

    // Cada búsqueda limpiamos nuestra lista de resultados de interés
    // También el input
    datos_resultados.value = [];

    //console.log(lista_palabras);
    for (let i = 0; i < lista_palabras.length; i++) {
      // Buscamos cada palabra en las variables de nombre, apellido_paterno y apellido_materno
      // Si se encuentra la palabra se revisa si esa entrada ya está en la lista datos_resultados
      // Y si no está se agrega
      let palabra = lista_palabras[i];
      //console.log(palabra);
      for (let m = 0; m < data.value.length; m++) {
        //console.log(data.value[m]["nombre"]);
        if (
          data.value[m]["nombres"].includes(palabra) ||
          data.value[m]["apellido_paterno"].includes(palabra) /* ||
        data.value[m]["apellido_materno"].includes(palabra) */
        ) {
          if (datos_resultados.value.includes(data.value[m])) {
            console.log("ya en lista");
          } else {
            datos_resultados.value.push(data.value[m]);
          }
        }
      }
    }
    //console.log(datos_resultados.value);
  }
}

function showPopUpInfo(x) {
  show_popup.value = true;
  datos_popup.value = x;
  console.log(x);
}

onMounted(() => {
  console.log("Se cargó el buscador");
});
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
  datos_resultados.value = [];
  candidate_buscade.value = "";
  mostrar_resultados.value = "no";
  input_invalido.value = false;
});
</script>

<style scoped>
.alert {
  width: 60%;
  padding: 20px 10px;
  margin: 10px 25%;
  background-color: #eda097;
  border-radius: 10px;
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
