import { defineStore } from "pinia";

export const useOrganoSeleccionado = defineStore("organoSeleccionado", {
  state: () => ({
    organo_seleccionado: "caratula",
  }),
  actions: {
    updateOrgano(nuevo_organo) {
      this.organo_seleccionado = nuevo_organo;
      //console.log(this.organo_seleccionado);
    },
  },
});
