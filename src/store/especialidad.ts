import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    especialidadData: [],
  },

  mutations: {
    SET_ESPECIALIDAD_DATA(state: { especialidadData: any }, data: any) {
      state.especialidadData = data
    },
  },

  actions: {
    async getEspecialidadData({ commit }: any,  paramsUrl: string) {
      commit('SET_ESPECIALIDAD_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/especialidad${paramsUrl}`, authorization)
        const r = response.data.especialidad
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_ESPECIALIDAD_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  },
}