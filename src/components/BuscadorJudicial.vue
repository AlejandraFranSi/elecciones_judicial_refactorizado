<template>
  <div class="contenedor-judicial">
    <!-- En esta parte se recibe el input del usuario -->
    <div>
      <h1>{{ organo_formateado[organo] }}</h1>
      <p class="instrucciones">
        Ingrese el nombre o apellido de la persona a la que buscar
      </p>

      <div class="buscador">
        <div class="contenedor-boton-buscar">
          <input
            type="text"
            id="name"
            name="name"
            v-model="candidate_buscade"
          />
          <button
            @click="buscar_persona"
            @keypress="enter_buscar_persona"
            class="boton-buscar"
          >
            Buscar
            <img src="../assets/img/Copia de search_icon.png" height="15" />
          </button>
        </div>
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
      <div class="contenedor-nombres-resultados">
        <div v-for="(entrada, index) in datos_resultados" :key="index">
          <button @click="showPopUpInfo(entrada)" class="tarjeta-persona">
            {{
              entrada["nombres"] +
              " " +
              entrada["apellido_paterno"] +
              " " +
              entrada["apellido_materno"]
            }}
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
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";
import PopUp from "./PopUp.vue";

// Const llamamos nuestras variables globales
const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

const organo_formateado = ref({
  suprema_corte: "Suprema Corte",
  sala_superior: "Sala Superior",
  sala_regional: "Sala Regional",
  tribunal_disciplinario: "Tribunal disciplinario",
  magistraturas_circuito: "Magistraturas de circuito",
  juzgadores_distrito: "Juzgadores de distrito",
});
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

  // Empezamos a definir qué hacer con el input
  if (typeof candidate_buscade.value != "string") {
    // Si el input es numerico
    input_invalido.value = true;
    //console.log("entró la respuesta input != string");
  } else if (!isNaN(candidate_buscade.value) == true) {
    // Revisamos que no sea un string que pueda ser numerico
    input_invalido.value = true;
    //console.log("entró la respuesta input es numérico");
  } else if (candidate_buscade.value.length === 0) {
    // Si el input es una cadena vacía
    input_invalido.value = true;
    //console.log("entró la respuesta input es cadena vacía");
  } else if (lista_palabras[0] == "") {
    // Si el input es una cadena de espacios vacíos
    input_invalido.value = true;
    //console.log("entró la respuesta input es secuencia de caracteres vacios");
  } else {
    //console.log("entró que el input es valido");
    input_invalido.value = false;
    //console.log(lista_palabras);
    for (let i = 0; i < lista_palabras.length; i++) {
      // Buscamos cada palabra en las variables de nombre, apellido_paterno y apellido_materno
      // Si se encuentra la palabra se revisa si esa entrada ya está en la lista datos_resultados
      // Y si no está se agrega
      let palabra = lista_palabras[i];
      //console.log(palabra);
      for (let m = 0; m < data.value.length; m++) {
        //console.log(data.value[m]);
        if (
          data.value[m]["nombres_formateado"].includes(palabra) ||
          data.value[m]["apellido_paterno_formateado"].includes(palabra) ||
          data.value[m]["apellido_materno"].includes(palabra)
        ) {
          //console.log("se encontró");
          if (datos_resultados.value.includes(data.value[m])) {
            //console.log("ya en lista");
            return;
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
    } else {
      // Hacemos que aparezca el div de resultados
      mostrar_resultados.value = "si";
    }
  }

  candidate_buscade.value = "";
}

function showPopUpInfo(x) {
  show_popup.value = true;
  datos_popup.value = x;
  //console.log(x);
}

onMounted(() => {
  //console.log("Se cargó el buscador");
  window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      buscar_persona();
      //console.log("se presiono enter");
    }
  });
});
onUnmounted(() => {
  window.removeEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      buscar_persona();
    }
  });
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
h1 {
  font-size: 64px;
  /*background-color: blue;*/
  margin-bottom: 0px;
}
.instrucciones {
  font-size: 22px;
  text-align: center;
  /*background-color: red;*/
}
.contenedor-judicial {
  /*background-color: orange;*/
  margin-top: -30px;
  margin-left: 10%;
  width: 80%;
}
.buscador {
  background-color: #f7e7d8;
  width: 50%;
  margin: 10px 25%;
  padding: 35px 15px;
  border: none;
  border-radius: 10px;
}
.contenedor-boton-buscar {
  display: flex;
  flex-wrap: wrap;
  width: 99%;
  height: 35px;
  text-align: left;
  border: solid 1px #eac099;
  border-radius: 10px;
  /*background-color: red;*/
  padding: 1px;
}
input {
  width: 70%;
  border: none;
  border-radius: 10px 0px 0px 10px;
  font-size: 20px;
}
.boton-buscar {
  width: 29%;
  height: 100%;
  margin: auto;
  padding: 3px 8px;
  border: none;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
  background-color: #ca6d16;
  color: white;
}
img {
  padding-left: 5px;
}
.alert {
  width: 50%;
  padding: 20px 10px;
  margin: 10px 25%;
  color: white;
  background-color: #ab9c8f;
  border-radius: 10px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}
.sin-resultados {
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
}

.resultados {
  /*background-color: orange;*/
}
h3 {
  font-size: 30px;
  /*background-color: lime;*/
  margin-bottom: 0px;
}
.contenedor-nombres-resultados {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  gap: 5px;
  margin: 0px 0px;
  padding: 10px;
  /*background-color: red;*/
}

.tarjeta-persona {
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

@media (max-width: 1100px) {
  .buscador {
    width: 70%;
    margin: 10px 8%;
  }
  input {
    width: 68%;
  }
  .alert {
    width: 71%;
    margin: 10px 8%;
  }
}

@media (max-width: 900px) {
  .contenedor-judicial {
    /*margin-top: -35px;*/
    margin-left: 0px;
    width: 100%;
  }
}

@media (max-width: 680px) {
  .buscador {
    width: 80%;
    margin: 10px 8%;
  }
  input {
    width: 68%;
  }
  .alert {
    width: 81%;
  }
}
</style>
