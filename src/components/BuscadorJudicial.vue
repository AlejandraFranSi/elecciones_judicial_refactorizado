<template>
  <div class="contenedor-judicial">
    <!-- En esta parte se recibe el input del usuario -->
    <div>
      <h3>Ingrese el nombre o apellido de la persona a la que busca</h3>
      <div class="contenedor-buscador">
        <label for="name">Escriba el nombre: </label>
        <input type="text" id="name" name="name" v-model="candidate_buscade" />
      </div>
      <div class="contenedor-boton-buscar">
        <button @click="buscar_persona()" class="boton-buscar">Buscar</button>
      </div>
    </div>

    <!-- En esta parte indica que la búsqueda no fue valida -->
    <div class="alert" v-if="input_invalido">Ingresa una búsqueda válida</div>

    <!-- En esta parte indica que la búsqueda no tuvo resultados -->
    <div class="sin-resultados" v-if="sin_resultados">
      No se encontraron resultados para su búsqueda
    </div>

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
    <!--     <span class="close" @click="show_popup = false">&times;</span> -->
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
const input_formateado = ref();
const mostrar_resultados = ref("no");
const sin_resultados = ref(false);
const input_invalido = ref(false);

// Las variables vinculadas al popup
const show_popup = ref(false);
const datos_popup = ref();

function buscar_persona() {
  // Cada que busquemos a alguien hay que vaciar la caja de resultados
  datos_resultados.value = [];
  mostrar_resultados.value = "no";
  sin_resultados.value = false;

  //console.log(typeof candidate_buscade.value);
  // Primero formateamos el input del usuario para que sea todo en minuúsculas
  input_formateado.value = candidate_buscade.value.toLowerCase();
  // Y quitamos los acento
  input_formateado.value = input_formateado.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  //console.log(input_formateado.value);

  // Tomamos el inpunt del lado del usuario y cramos una lista
  // con las distintas palabras que buscadas separadas por un espacio
  let lista_palabras = input_formateado.value.split(" ");
  lista_palabras = [...new Set(lista_palabras)];
  //console.log(lista_palabras);
  if (typeof candidate_buscade.value != "string") {
    // Si el input es numerico
    input_invalido.value = true;
  } else if (!isNaN(candidate_buscade.value) == true) {
    // Revisamos que no sea un string que pueda ser numerico
    input_invalido.value = true;
  } else if (candidate_buscade.value.length === 0) {
    // Si el input es una cadena vacía
    input_invalido.value = true;
  } else if (lista_palabras[0] == "") {
    // Si el input es una cadena de espacios vacíos
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
    if (datos_resultados.value.length == 0) {
      sin_resultados.value = true;
      mostrar_resultados.value = "no";
      //console.log("sin resultados");
    }
  }
}

function showPopUpInfo(x) {
  show_popup.value = true;
  datos_popup.value = x;
  //console.log(x);
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
.contenedor-judicial {
  /*background-color: pink;*/
}
.contenedor-buscador {
  /*background-color: orange;*/
  margin: 5px 0px;
}
.contenedor-boton-buscar {
  text-align: left;
  margin: 20px 0px;
}
.boton-buscar {
  margin: auto;
  padding: 3px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  background-color: #72cde9;
}
.alert {
  width: 60%;
  padding: 20px 10px;
  margin: 10px 25%;
  background-color: #eda097;
  border-radius: 10px;
}
.sin-resultados {
  font-size: 18px;
  font-weight: bold;
}
</style>
