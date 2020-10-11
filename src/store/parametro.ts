import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    parametroData1: [],
    parametroData2: [],
    parametroData3: [],
  },

  mutations: {
    SET_PARAMETRO_DATA_1(state: { parametroData1: any }, data: any) {
      state.parametroData1 = data
    },

    SET_PARAMETRO_DATA_2(state: { parametroData2: any }, data: any) {
      state.parametroData2 = data
    },

    SET_PARAMETRO_DATA_3(state: { parametroData3: any }, data: any) {
      state.parametroData3 = data
    },
  },

  actions: {
    async getParametroData1({ commit }: any, paramsUrl: string) {
      commit('SET_PARAMETRO_DATA_1', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/parametro${paramsUrl}`, authorization)
        const r = response.data.parametro
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_PARAMETRO_DATA_1', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async getParametroData2({ commit }: any, paramsUrl: string) {
      commit('SET_PARAMETRO_DATA_2', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/parametro${paramsUrl}`, authorization)
        const r = response.data.parametro
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_PARAMETRO_DATA_2', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async getParametroData3({ commit }: any, paramsUrl: string) {
      commit('SET_PARAMETRO_DATA_3', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/parametro${paramsUrl}`, authorization)
        const r = response.data.parametro
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_PARAMETRO_DATA_3', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    setParametroData1({ commit }: any, data: any) {
      commit('SET_PARAMETRO_DATA_1', data)
    },

    setParametroData2({ commit }: any, data: any) {
      commit('SET_PARAMETRO_DATA_2', data)
    },

    setParametroData3({ commit }: any, data: any) {
      commit('SET_PARAMETRO_DATA_3', data)
    },
  }
}