import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import agendaAtencion from './agendaAtencion'
import centroAsistencial from './centroAsistencial'
import consultaMedica from './consultaMedica'
import controlCrecimiento from './controlCrecimiento'
import controlPeriodico from './controlPeriodico'
import diresa from './diresa'
import especialidad from './especialidad'
import evaluacion from './evaluacion'
import historiaClinica from './historiaClinica'
import evaluacionAlimentacion from './evaluacionAlimentacion'
import microredAsistencial from './microredAsistencial'
import paciente from './paciente'
import parametro from './parametro'
import redAsistencial from './redAsistencial'
import rol from './rol'
import rulesValidate from './rulesValidate'
import ticket from './ticket'
import usuario from './usuario'
import usuarioxCentro from './usuarioxCentro'
import vacuna from './vacuna'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    agendaAtencion,
    centroAsistencial,
    consultaMedica,
    controlCrecimiento,
    controlPeriodico,
    diresa,
    especialidad,
    evaluacion,
    historiaClinica,
    evaluacionAlimentacion,
    microredAsistencial,
    paciente,
    parametro,
    redAsistencial,
    rol,
    rulesValidate,
    ticket,
    usuario,
    usuarioxCentro,
    vacuna,
  }
})
