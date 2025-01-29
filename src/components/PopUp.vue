<template>
  <!--       Este es la ventana pop-up en la que se muestra la info de la persona
      seleccionada -->
  <div class="contenedor-externo">
    <div class="contenedor-gral">
      <div class="contenedor-interno">
        <h1>
          Nombres:
          {{
            datos_candidate["nombres"] +
            " " +
            datos_candidate["apellido_paterno"] +
            " "
          }}
        </h1>
      </div>
      <div class="contenedor-interno">
        <p>Sexo:</p>
        <p>Entidad de residencia:</p>
        <p>Edad:</p>
      </div>
    </div>

    <div class="contenedor-gral">
      <div class="contenedor-interno">
        <h3>Educación</h3>
      </div>
      <div class="contenedor-interno">
        <h3>Experiencia</h3>
      </div>
    </div>

    <div class="contenedor-gral">
      <div class="contenedor-interno">
        <p>Antecedentes en noticias</p>
        <div class="contenedor-antecedentes">
          <div class="antecedente"></div>
          <div class="antecedente"></div>
          <div class="antecedente"></div>
        </div>
      </div>
      <div class="contenedor-interno">
        <p>Antecedentes en redes sociales</p>
        <div class="contenedor-antecedentes">
          <div class="antecedente"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, onMounted } from "vue";

// eslint-disable-next-line
const props = defineProps({
  datos_candidate: {
    type: Object,
    default: Object,
  },
});
const { datos_candidate } = toRefs(props);

onMounted(() => {
  console.log(datos_candidate.value);
});
</script>

<style scoped>
.contenedor-externo {
  height: 100%;
  margin-top: 25px;
}
.contenedor-gral {
  display: flex;
  flex-wrap: wrap;
  height: 30%;
  margin: 5px;
  gap: 3px;
}
.contenedor-interno {
  width: 49%;
  margin: 3px;
  background-color: white;
}
.contenedor-antecedentes {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 5px;
}
.antecedente {
  height: 20px;
  width: 20px;
  background-color: black;
}
</style>
