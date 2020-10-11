import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    evaluacionAlimentacionData: null,
  },

  mutations: {
    SET_EVALUACION_ALIMENTACION_DATA(state: { evaluacionAlimentacionData: any }, data: any) {
      state.evaluacionAlimentacionData = data
    },
  },

  actions: {
    async getEvaluacionAlimentacionData({ commit }: any, paramsUrl: string) {
      commit('SET_EVALUACION_ALIMENTACION_DATA', null)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/evaluacionAlimentacion${paramsUrl}`, authorization)
        const r = response.data.evaluacionAlimentacion
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || null
          commit('SET_EVALUACION_ALIMENTACION_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  }
}