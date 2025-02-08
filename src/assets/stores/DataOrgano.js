import { defineStore } from "pinia";
import data from "../data/info_candidates.json";

export const useDataOrgano = defineStore("dataOrgano", {
  state: () => ({
    data_organo: data["caratula"],
  }),
  actions: {
    updateOrgano(nuevo_organo) {
      this.data_organo = data[nuevo_organo];
      //console.log(this.data_organo.length);
    },
  },
});
