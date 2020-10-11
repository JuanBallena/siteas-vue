import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    rangoControlCrecimientoData: [],
    tipoControlCrecimientoData: [],
  },

  mutations: {
    SET_RANGO_CONTROL_CRECIMIENTO_DATA(state: { rangoControlCrecimientoData: any }, data: any) {
      state.rangoControlCrecimientoData = data
    },

    SET_TIPO_CONTROL_CRECIMIENTO_DATA(state: { tipoControlCrecimientoData: any }, data: any) {
      state.tipoControlCrecimientoData = data
    },
  },

  actions: {
    async getRangoControlCrecimientoData({ commit }: any, paramsUrl: string) {
      commit('SET_RANGO_CONTROL_CRECIMIENTO_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/rangoControlCrecimiento${paramsUrl}`, authorization)
        const r = response.data.rangoControlCrecimiento
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_RANGO_CONTROL_CRECIMIENTO_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async getTipoControlCrecimientoData({ commit }: any, idRangoControlCrecimiento: any) {
      commit('SET_TIPO_CONTROL_CRECIMIENTO_DATA', [])
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/tipoControlCrecimiento?idRangoControlCrecimiento=${idRangoControlCrecimiento}`, authorization)
        const r = response.data.tipoControlCrecimiento
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_TIPO_CONTROL_CRECIMIENTO_DATA', data)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    setTipoControlCrecimientoData({ commit }: any, data: any) {
      commit('SET_TIPO_CONTROL_CRECIMIENTO_DATA', data)
    }
  }
}