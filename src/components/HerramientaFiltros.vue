<template>
  <!--   <div>
    <h1>Esta es la vista con los filtros</h1>
    <p>{{ data.length }}, {{ organo }}</p>
  </div> -->
  <!-- Esta sección es la que contiene los controles de los filtros -->
  <div class="contenedor-controles">
    <h2>Selecciona las categorías de tu interés</h2>
    <!--   Esta sección es la encargada de controlar los filtros-->
    <div class="botones-filtros">
      <div class="categoria-boton">
        <label for="sexo">Sexo</label>
        <select
          name="sexo"
          id="sexo"
          v-model="seleccion_sexo"
          @change="setFiltros()"
        >
          <option value="Ninguno">Ninguno</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="No binario">No binario</option>
        </select>
      </div>
      <div class="categoria-boton">
        <label for="sexo">Edad</label>
        <select
          name="grupo_edad"
          id="grupo_edad"
          v-model="seleccion_edad"
          @change="setFiltros()"
        >
          <option value="Ninguno">Ninguno</option>
          <option value="35-39">35-39</option>
          <option value="40-44">40-44</option>
          <option value="45-49">45-49</option>
          <option value="50-54">50-54</option>
          <option value="55-59">55-59</option>
          <option value="60-64">60-64</option>
          <option value="65-69">65-69</option>
          <option value="70-74">70-74</option>
          <option value="75-80">75-80</option>
        </select>
      </div>
      <div class="categoria-boton">
        <label for="anios_exp">Grado académico</label>
        <select
          name="estudios"
          id="estudios"
          v-model="seleccion_estudios"
          @change="setFiltros()"
        >
          <option value="Ninguno">Ninguno</option>
          <option value="Licenciatura">Licenciatura</option>
          <option value="Maestria">Maestría</option>
          <option value="Doctorado">Doctorado</option>
          <option value="Posgrado">Posgrado</option>
        </select>
      </div>

      <div class="categoria-boton">
        <label for="anios_exp">Años de experiencia</label>
        <select
          name="anios_exp"
          id="anios_exp"
          v-model="seleccion_anios_exp"
          @change="setFiltros()"
        >
          <option value="Ninguno">Ninguno</option>
          <option value="0-4">0-4</option>
          <option value="5-9">5-9</option>
          <option value="10-14">10-14</option>
          <option value="14+">14+</option>
        </select>
      </div>
    </div>
  </div>

  <div class="contenedor-dos-cajas">
    <!-- Aquí vamos a llamar un div para insertar el gráfio--->
    <div class="vis-seleccionada">
      <label class="toggle-switch">
        <input type="checkbox" v-model="switch_value" />
        <span class="slider"></span>
      </label>
      <GraficoCordenadasParalelas
        :datos="datos_mostrados"
        :filtros="filtros_dict"
        v-if="switch_value == true"
      />
      <GraficoDona :datos="datos_mostrados" v-if="switch_value == false" />
    </div>
    <!-- Mientras que acá insertamos un div para que se desplieguen los nombres de los candidatos que cumplen los filtros--->
    <div class="tarjetas-candidates">
      <h3>Candidatas y candidatos con las características seleccionadas:</h3>
      <!--  Esta es la caja correspondiente al caso en el que no hay resultados para la busqueda-->
      <div class="sin-resultados" v-if="sin_resultados">
        No se encontraron resultados para su búsqueda
      </div>
      <div class="contenedor-personas" v-if="!sin_resultados">
        <button
          class="rectangulo-persona"
          v-for="(persona, index) in datos_mostrados"
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
    <!--     <span class="close" @click="show_popup = false">&times;</span>-->
  </div>
</template>

<script setup>
import { ref, /*onMounted,*/ watch } from "vue";
import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";
import GraficoDona from "../components/GraficoDona.vue";
import GraficoCordenadasParalelas from "../components/GraficoCordenadasParalelas.vue";
import PopUp from "./PopUp.vue";

// Llamamos nuestras variables locales
const dataStore = useDataOrgano();
const data = ref(dataStore.data_organo);
const organoStore = useOrganoSeleccionado();
const organo = ref(organoStore.organo_seleccionado);

// Ahora definimos las variables relacionadas con el control de los filtros
const seleccion_sexo = ref("Ninguno");
const seleccion_edad = ref("Ninguno");
const seleccion_anios_exp = ref("Ninguno");
const seleccion_estudios = ref("Ninguno");
const filtros_dict = ref();
const filtros_aplicados = ref([]);

// Ahora definimos las variables que van a estar relacionadas con la creacion del
// subconjunto de datos que cumplen con los filtros seleccionados
const datos_filtrados_dict = ref({});
const datos_mostrados = ref(data.value);
const sin_resultados = ref(false);

// Los datos vinculados al popup
const show_popup = ref(false);
const datos_popup = ref();

// Los datos vinculados al toggle de la gráfica
const switch_value = ref(false);

function setFiltros() {
  // Reseteamos nuestra variable de sin resultados
  sin_resultados.value = false;
  // Creamos un diccionario con los filtros aplicados por categoría
  filtros_dict.value = {
    sexo: seleccion_sexo.value,
    grupo_etario: seleccion_edad.value,
    anios_experiencia: seleccion_anios_exp.value,
    ultimo_grado: seleccion_estudios.value,
  };

  // Limpiamos y creamos una lista con los filtros seleccionados
  filtros_aplicados.value = [];
  for (let i = 0; i < Object.keys(filtros_dict.value).length; i++) {
    let variable = Object.keys(filtros_dict.value)[i];
    if (filtros_dict.value[variable] != "Ninguno") {
      filtros_aplicados.value.push(variable);
    }

    //console.log(filtros_aplicados.value.length);
  }

  // A partir de los filtros seleccionados queremos crear un subconjunto de datos
  // Así, creamos o limpiamos una lista en la cual vamos a meter los registros que cumplen con los filtros seleccionados
  datos_mostrados.value = [];
  datos_filtrados_dict.value = {};

  if (filtros_aplicados.value.length == 0) {
    // Si no hay filtros aplicados mostramos la data de todos los candidatos
    datos_mostrados.value = data.value;
    //console.log("sin filtros");
  } else if (filtros_aplicados.value.length == 1) {
    // Si tenemos solo un filtro la selección de las entradas que lo cumplen se hace con un simple mapeo
    let filtro = filtros_aplicados.value[0];
    for (let i = 0; i < data.value.length; i++) {
      if (data.value[i][filtro] == filtros_dict.value[filtro]) {
        datos_mostrados.value.push(data.value[i]);
      }
    }
    //console.log(datos_mostrados.value.length);
  } else if (filtros_aplicados.value.length >= 2) {
    // Mientras que si aplicamos más de un filtro la cosa es un poco más complicada.
    // Vamos a filtrar los datos de manera recutsiva; es decir,
    // primero vamos a crear el subconjunto de los que cumplen con un filtro
    // sobre ese subconjunto se buscarán los que cumplan con el segundo filtro y así sucesivamente
    // Entonces lo primero que hacemos es crear un diccionario con listas de datos que serán esos subconjuntos
    for (let i = 0; i < filtros_aplicados.value.length; i++) {
      datos_filtrados_dict.value[filtros_aplicados.value[i]] = [];
    }
    //console.log(datos_filtrados_dict.value);
    // Hacemos el primer filtro de los datos globales
    for (let i = 0; i < data.value.length; i++) {
      let primer_filtro = filtros_aplicados.value[0];
      if (data.value[i][primer_filtro] == filtros_dict.value[primer_filtro]) {
        datos_filtrados_dict.value[primer_filtro].push(data.value[i]);
      }
    }
    //console.log(datos_filtrados_dict.value);
    // Ahora vamos a hacer un loop a partir de cada filtro aplicado
    for (let i = 0; i < filtros_aplicados.value.length - 1; i++) {
      // Entramos al diccionario de datos del primer filtro
      for (
        let m = 0;
        m < datos_filtrados_dict.value[filtros_aplicados.value[i]].length;
        m++
      ) {
        let entrada = datos_filtrados_dict.value[filtros_aplicados.value[i]][m];
        if (
          entrada[filtros_aplicados.value[i + 1]] ==
          filtros_dict.value[filtros_aplicados.value[i + 1]]
        ) {
          //datos_filtrados_dict.value[filtros_aplicados.value[i + 1]] = [];
          datos_filtrados_dict.value[filtros_aplicados.value[i + 1]].push(
            entrada
          );
        }
      }
    }
    let ultimo_filtro =
      filtros_aplicados.value[filtros_aplicados.value.length - 1];
    datos_mostrados.value = datos_filtrados_dict.value[ultimo_filtro];
    //console.log(datos_filtrados_dict.value);

    if (datos_mostrados.value.length == 0) {
      //console.log("no hay resultados para tu búsqueda");
      sin_resultados.value = true;
    }
  }
  //console.log(filtros_aplicados.value.length);
}

function showPopUpInfo(x) {
  show_popup.value = true;
  datos_popup.value = x;
  //console.log(x);
}

/* onMounted(() => {
  console.log("Se cargó la herramienta de los filtros");
}); */
// Montamos un watcher en la store de la data para actualizar los datos de la vista
watch(dataStore, () => {
  data.value = dataStore.data_organo;
  organo.value = organoStore.organo_seleccionado;
  setFiltros();
});
watch(switch_value, () => {
  console.log(switch_value.value);
});
</script>

<style scoped>
.contenedor-controles {
  /*background-color: orange;*/
  margin-top: -20px;
}

.contenedor-dos-cajas {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /*background-color: red;*/
}

.vis-seleccionada {
  /*background-color: cyan;*/
  width: 50%;
}

.tarjetas-candidates {
  width: 50%;
  /*background-color: blue;*/
}

.botones-filtros {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  padding: 5px;
  gap: 5px 0px;
  /*background-color: lawngreen;*/
}

.categoria-boton {
  /*background-color: plum;*/
}
.contenedor-personas {
  background-color: #d2d6da;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  gap: 5px;
  margin: 0px 0px;
  padding: 5px;
}
.rectangulo-persona {
  background-color: #6084a8;
  color: #dde0e3;
  margin: 5px;
  padding: 5px 8px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

/* Contenedor del toggle*/
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  /*background-color: red;*/
  margin: auto;
}
/* Ocultar el checkbox */
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* El track del toggle*/
.slider {
  position: absolute;
  top: 2px;
  cursor: pointer;
  background-color: #d2d6da;
  border-radius: 20px;
  width: 80%;
  height: 80%;
  transition: background-color 0.3s;
}

/* The circular slider */
.slider::before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  left: 1px;
  bottom: 0px;
  background-color: #72cde9;
  border-radius: 50%;
  transition: transform 0.3s;
}

.toggle-switch input:checked + .slider::before {
  transform: translateX(19px);
}

/* Para tableta */
@media (max-width: 1200px) {
}

/* Para celular */
@media (max-width: 680px) {
  .contenedor-controles {
    margin-top: 0px;
  }
  .vis-seleccionada {
    width: 100%;
  }

  .tarjetas-candidates {
    width: 100%;
  }
  .categoria-boton {
    width: 48%;
  }
  label {
    width: 100%;
  }
  select {
    width: 98%;
  }
}
</style>
