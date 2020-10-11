import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    tipoEvaluacionData: [],
  },

  mutations: {
    SET_TIPO_EVALUACION_DATA(state: { tipoEvaluacionData: any }, data: any) {
      state.tipoEvaluacionData = data
    },
  },

  actions: {
    async getTipoEvaluacionData({ commit }: any, idEvaluacion: any) {
      commit('SET_TIPO_EVALUACION_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/tipoEvaluacion?idEvaluacion=${idEvaluacion}`, authorization)
        const r = response.data.tipoEvaluacion
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_TIPO_EVALUACION_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    setTipoEvaluacionData({ commit }: any, data: any) {
      commit('SET_TIPO_EVALUACION_DATA', data)
    }
  }
}