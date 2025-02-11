<template>
  <div
    class="contenedor-ver-todo"
    :class="common_switch ? 'vista-animada-a' : 'vista-animada-b'"
  >
    <div>
      <h1>{{ organo_formateado[organo] }}</h1>
      <p class="instrucciones">
        Los nombres están ordenados alfabéticamente por el apellido paterno. Da
        clic en el nombre del o la candidata de quien desees conocer más
        información
      </p>
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
import "animate.css";
import { ref, onMounted, watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";
import PopUp from "./PopUp.vue";

// Llamamos nuestras variables globales
const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

const organo_formateado = ref({
  suprema_corte: "Suprema Corte de Justicia de la Nación",
  sala_superior: "Sala Superior del TEPJ",
  sala_regional: "Sala Regional del TEPJ",
  tribunal_disciplinario: "Tribunal de Disciplina Judicial",
  magistraturas_circuito: "Tribunales Colegiados de Circuito",
  juzgadores_distrito: "Juzgados de Distrito",
});

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

// El switch para intercambiar las clases
const common_switch = ref(true);

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
  //console.log(x);
}

onMounted(() => {
  ordenar_datos();
});
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
  ordenar_datos();
  common_switch.value = !common_switch.value;
});
</script>

<style scoped>
h1 {
  font-size: 64px;
  /*background-color: blue;*/
  margin-bottom: 0px;
}
.instrucciones {
  font-size: 22px;
}
.contenedor-ver-todo {
  /*background-color: orange;*/
  margin-top: -30px;
  margin-left: 10%;
  width: 80%;
}

.contenedor-letra {
  padding: 0px 0px;
  margin: 15px 0px;
}

.header-letra {
  background-color: #ebe3dc;
  /*background-color: #c8ccd0;*7
  /*color: #a7cced;*/
  /*color: #ca6d27;*/
  color: #ca6d27;
  padding: 0px 10px 5px 10px;
  margin: 0px 0px;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  /*border: none;*/
  border-radius: 10px;
  border-top: solid;
  border-top-width: 2px;
  /*border-top-color: #a7cced;*/
  border-top-color: #ca6d27;
}

.contenedor-personas {
  /*background-color: #e9ebed;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  gap: 5px;
  margin: 0px 0px;
  padding: 5px;
}
.rectangulo-persona {
  color: #1d69a2;
  background-color: white;
  /*color: #dde0e3;*/
  margin: 5px;
  padding: 8px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
}
/* Las clases animadas */
.vista-animada-a {
  /*background-color: orange;*/
  animation: fadeInLeft;
  animation-duration: 0.5s;
}
.vista-animada-b {
  /*background-color: pink;*/
  animation: slideInLeft 0.5s, fadeIn 0.5s;
}
@media (max-width: 900px) {
  .contenedor-ver-todo {
    /*margin-top: -35px;*/
    margin-left: 0px;
    width: 100%;
  }
}
</style>
