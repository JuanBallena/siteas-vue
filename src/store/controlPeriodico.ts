import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    tipoControlPeriodicoData: [],
  },

  mutations: {
    SET_TIPO_CONTROL_PERIODICO_DATA(state: { tipoControlPeriodicoData: any }, data: any) {
      state.tipoControlPeriodicoData = data
    },
  },

  actions: {
    async getTipoControlPeriodicoData({ commit }: any, idControlPeriodico: any) {
      commit('SET_TIPO_CONTROL_PERIODICO_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/tipoControlPeriodico?idControlPeriodico=${idControlPeriodico}`, authorization)
        const r = response.data.tipoControlPeriodico
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_TIPO_CONTROL_PERIODICO_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    setTipoControlPeriodicoData({ commit }: any, data: any) {
      commit('SET_TIPO_CONTROL_PERIODICO_DATA', data)
    }
  }
}