import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    ticketData: [],
    isSuccess: false,
    ticketCreated: '',
    ticketToEdit: '',
    pagesTicket: -1,
    guardando: false,
  },

  mutations: {
    SET_TICKET_DATA(state: { ticketData: any }, data: any) {
      state.ticketData = data
    },

    SET_IS_SUCCESS(state: { isSuccess: object }, value: object) {
      state.isSuccess = value
    },

    SET_TICKET_CREATED(state: { ticketCreated: object }, data: object) {
      state.ticketCreated = data
    },

    SET_TICKET_TO_EDIT(state: { ticketToEdit: object }, data: object) {
      state.ticketToEdit = data
    },

    SET_PAGES_TICKET(state: { pagesTicket: number }, pages: number) {
      state.pagesTicket = pages
    },

    SET_GUARDANDO(state: { guardando: boolean }, value: boolean) {
      state.guardando = value
    },
  },

  actions: {
    async getTicketData({ commit }: any,  paramsUrl: string) {
      commit('SET_TICKET_DATA', [])
      commit('SET_PAGES_TICKET', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/ticket${paramsUrl}`, authorization)
        const r = response.data.ticket
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data
          const pages = r.pages
          commit('SET_TICKET_DATA', data == null ? [] : data)
          commit('SET_PAGES_TICKET', pages)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async edit({ commit }: any, idTicket: string) {
      commit('SET_TICKET_TO_EDIT', '')
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/ticket?id=${idTicket}`, authorization)
        const r = response.data.ticket
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || ''
          commit('SET_TICKET_TO_EDIT', data[0])
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async save({ commit }: any, params: object) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_TICKET_CREATED', '')
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/ticket`, params, authorization)
        const r = response.data.ticket
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS', true)
          commit('SET_TICKET_CREATED', r.data)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async update({ commit }: any, { idTicket, params }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/ticket/diagnostico-enfermero/${idTicket}`, params, authorization)
        const r = response.data['diagnostico-enfermero']
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  }
}