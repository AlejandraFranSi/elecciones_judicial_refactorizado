<template>
  <div class="contenedor-externo-caratula">
    <h1>Titulo del proyecto</h1>
    <p class="presentacion">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
      dolor nibh. Nam porta, odio vitae dignissim varius, elit lectus commodo
      risus, sit amet imperdiet ipsum libero et augue. Sed ornare vestibulum
      quam in tincidunt. Donec dictum, urna at feugiat iaculis, urna mi semper
      mi, eget efficitur sem lorem non ligula. Aliquam erat volutpat. Nulla
      ullamcorper mollis magna, ut molestie diam feugiat quis. Sed efficitur
      laoreet ex. Morbi mattis semper risus, at mollis diam condimentum at.
      Quisque vel nibh malesuada, vulputate tortor nec, gravida ex. Praesent et
      sollicitudin ligula, vestibulum ultricies purus. Quisque eget est est. Ut
      hendrerit venenatis erat, id porta justo vulputate vitae. Nulla vitae
      magna at enim placerat viverra. Vestibulum id est ultricies, viverra
      turpis vitae, congue massa. Vivamus sed ex nec nisl luctus semper.
      Phasellus ut ante tristique, bibendum eros ut, dictum orci. Vivamus quis
      ante ex. Mauris id nulla ligula. Maecenas dignissim dignissim augue vel
      euismod. Aliquam turpis tellus, iaculis sed porta ut, interdum sed tortor.
      Sed sollicitudin, lorem non consectetur venenatis, enim lacus euismod
      justo, blandit aliquet lorem dui sagittis lacus. Nam tincidunt enim ac
      elit eleifend mollis. Phasellus faucibus purus at lectus tincidunt, eget
      molestie sem blandit.
    </p>
    <button class="boton-explora" @click="startTool">
      Explora la herramienta
    </button>
  </div>
</template>
<script setup>
import "animate.css";

import { useDataOrgano } from "../assets/stores/DataOrgano.js";
import { useOrganoSeleccionado } from "../assets/stores/OrganoSeleccionado.js";
import { useVistaMostrada } from "../assets/stores/VistaMostrada.js";

const dataStore = useDataOrgano();
const organoStore = useOrganoSeleccionado();
const vistaStore = useVistaMostrada();

function startTool() {
  dataStore.updateOrgano("suprema_corte");
  organoStore.updateOrgano("suprema_corte");
  vistaStore.updateVista("descripccion_inicio");
}
</script>
<style>
h1 {
  font-size: 64px;
  /*background-color: blue;*/
  margin-bottom: 0px;
}

.contenedor-externo-caratula {
  margin-top: -20px;
  margin-left: 10%;
  width: 80%;
  animation: fadeIn;
  animation-duration: 0.5s;
  /*background-color: plum;*/
}
.presentacion {
  /*background-color: cyan;
  margin: 10px 0px;*/
  font-size: 22px;
}

.boton-explora {
  height: 80px;
  border: solid 1px #ca6d16;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
  background-color: #f7e7d8;
  color: #ca6d16;
  font-weight: bold;
  padding: 0px 35px;
}
</style>
