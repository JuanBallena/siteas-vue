import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    rangoVacunaData: [],
    tipoVacunaData: [],
  },

  mutations: {
    SET_RANGO_VACUNA_DATA(state: { rangoVacunaData: any }, data: any) {
      state.rangoVacunaData = data
    },

    SET_TIPO_VACUNA_DATA(state: { tipoVacunaData: any }, data: any) {
      state.tipoVacunaData = data
    },
  },

  actions: {
    async getRangoVacunaData({ commit }: any, criterio: any) {
      commit('SET_RANGO_VACUNA_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/rangoVacuna?criterio=${criterio}`, authorization)
        const r = response.data.rangoVacuna
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_RANGO_VACUNA_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async getTipoVacunaData({ commit }: any, idRangoVacuna: any) {
      commit('SET_TIPO_VACUNA_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/tipoVacuna?idRangoVacuna=${idRangoVacuna}`, authorization)
        const r = response.data.tipoVacuna
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_TIPO_VACUNA_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    setTipoVacunaData({ commit }: any, data: any) {
      commit('SET_TIPO_VACUNA_DATA', data)
    }
  }
}