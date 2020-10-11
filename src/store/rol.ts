import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    rolData: [],
  },

  mutations: {
    SET_ROL_DATA(state: { rolData: any }, data: any) {
      state.rolData = data
    },
  },

  actions: {
    async getRolData({ commit }: any,  paramsUrl: string) {
      commit('SET_ROL_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/rol${paramsUrl}`, authorization)
        const r = response.data.rol
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_ROL_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  },
}