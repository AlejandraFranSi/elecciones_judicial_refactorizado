import { defineStore } from "pinia";

export const useVistaMostrada = defineStore("vistaMostrada", {
  state: () => ({
    vista_mostrada: "caratula",
  }),
  actions: {
    updateVista(nueva_vista) {
      this.vista_mostrada = nueva_vista;
      //console.log(this.vista_mostrada);
    },
  },
});
