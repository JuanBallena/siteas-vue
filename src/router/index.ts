import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import * as ls from '@/localStorage/index'
import { esIdPositico } from '@/router/routerCommon'
import { 
  redirectToPrincipal,
  redirectIndexHistoriaClinica,
} from "@/router/routerCommon";
import {
  ROL_SUPERVISOR, 
  ROL_ADMINISTRADOR,
  ROL_ENFERMERO,
  ROL_ENFERMERO_ESPECIALISTA,
  ROL_MEDICO_TRATANTE,
  ROL_MEDICO_ESPECIALISTA,
} from '@/common/rolDefinition'
import { 
  CRITERIO_NINO,
  CRITERIO_ADOLESCENTE,
  CRITERIO_JOVEN,
  CRITERIO_ADULTO,
  CRITERIO_ADULTO_MAYOR,
} from "@/common/historiaClinicaDefinition";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  /******** Auth ********/
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: {
      noLogged: true
    },
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecoverPassword',
    component: () => import('../views/auth/RecoverPassword.vue'),
  },
  {
    path: '/seleccionar-centro-asistencial',
    name: 'SelectCenter',
    component: () => import('../views/auth/SelectCenter.vue'),
    meta: {
      requiresAuth: true
    },
  },
  /******** Seguridad ********/
  {
    path: '/cambiar-contrasena',
    name: 'ChangePassword',
    component: () => import('../views/security/ChangePassword.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/layout/Index.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      /******** Seguridad ********/
      {
        path: '/actualizar-contrasena',
        name: 'EditPassword',
        component: () => import('../views/security/EditPassword.vue'),
      },
      /******** Diresa ********/
      {
        path: 'diresa',
        name: 'ListDiresa',
        component: () => import('../views/core/diresa/List.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'diresa/registrar',
        name: 'CreateDiresa',
        component: () => import('../views/core/diresa/Create.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'diresa/actualizar/:id',
        name: 'EditDiresa',
        component: () => import('../views/core/diresa/Edit.vue'),
        meta: {
          supervisor: true,
          idValido: true,
        },
      },
      /******** Red Asistencial ********/
      {
        path: 'red-asistencial',
        name: 'ListRedAsistencial',
        component: () => import('../views/core/redAsistencial/List.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'red-asistencial/registrar',
        name: 'CreateRedAsistencial',
        component: () => import('../views/core/redAsistencial/Create.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'red-asistencial/actualizar/:id',
        name: 'EditRedAsistencial',
        component: () => import('../views/core/redAsistencial/Edit.vue'),
        meta: {
          supervisor: true,
          idValido: true,
        },
      },
      /******** Microred Asistencial ********/
      {
        path: 'microred-asistencial',
        name: 'ListMicroredAsistencial',
        component: () => import('../views/core/microredAsistencial/List.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'microred-asistencial/registrar',
        name: 'CreateMicroredAsistencial',
        component: () => import('../views/core/microredAsistencial/Create.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'microred-asistencial/actualizar/:id',
        name: 'EditMicroredAsistencial',
        component: () => import('../views/core/microredAsistencial/Edit.vue'),
        meta: {
          supervisor: true,
          idValido: true,
        },
      },
      /******** Centro Asistencial ********/
      {
        path: 'centro-asistencial',
        name: 'ListCentroAsistencial',
        component: () => import('../views/core/centroAsistencial/List.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'centro-asistencial/registrar',
        name: 'CreateCentroAsistencial',
        component: () => import('../views/core/centroAsistencial/Create.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'centro-asistencial/actualizar/:id',
        name: 'EditCentroAsistencial',
        component: () => import('../views/core/centroAsistencial/Edit.vue'),
        meta: {
          supervisor: true,
          idValido: true,
        },
      },
      /******** Usuario Supervisor ********/
      {
        path: 'usuario-principal',
        name: 'ListUsuarioPrincipal',
        component: () => import('../views/core/usuario/superAdmin/List.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'usuario-principal/registrar',
        name: 'CreateUsuarioPrincipal',
        component: () => import('../views/core/usuario/superAdmin/Create.vue'),
        meta: {
          supervisor: true,
        },
      },
      {
        path: 'usuario-principal/actualizar/:id',
        name: 'EditUsuarioPrincipal',
        component: () => import('../views/core/usuario/superAdmin/Edit.vue'),
        meta: {
          supervisor: true,
          idValido: true,
        },
      },
      /******** Usuario Admin ********/
      {
        path: 'usuario-secundario',
        name: 'ListUsuarioSecundario',
        component: () => import('../views/core/usuario/admin/List.vue'),
        meta: {
          admin: true,
        },
      },
      {
        path: 'usuario-secundario/registrar',
        name: 'CreateUsuarioSecundario',
        component: () => import('../views/core/usuario/admin/Create.vue'),
        meta: {
          admin: true,
        },
      },
      {
        path: 'usuario-secundario/actualizar/:id',
        name: 'EditUsuarioSecundario',
        component: () => import('../views/core/usuario/admin/Edit.vue'),
        meta: {
          admin: true,
          idValido: true,
        },
      },
      /******** Paciente ********/
      {
        path: 'paciente',
        name: 'ListPaciente',
        component: () => import('../views/core/paciente/List.vue'),
        meta: {
          enfermeroMedico: true,
        },
      },
      {
        path: 'paciente/actualizar/:id',
        name: 'EditPaciente',
        component: () => import('../views/core/paciente/Edit.vue'),
        meta: {
          enfermeroMedico: true,
          idValido: true,
        },
      },
      {
        path: 'paciente/triaje/actualizar/:idTicket',
        name: 'EditTriaje',
        component: () => import('../views/core/paciente/triaje/Edit.vue'),
        meta: {
          enfermero: true,
          idValido: true,
        },
      },
      {
        path: 'paciente/triaje/detalles/:idTicket',
        name: 'DetailTriaje',
        component: () => import('../views/core/paciente/triaje/Detail.vue'),
        meta: {
          enfermeroMedico: true,
          idValido: true,
        },
      },
      /******** Ticket ********/
      {
        path: 'paciente/ticket/registrar-llegada',
        name: 'CreateTicket',
        component: () => import('../views/core/paciente/ticket/Create.vue'),
        meta: {
          enfermero: true,
        },
      },
      {
        path: 'paciente/ticket/detalles/:idTicket',
        name: 'DetailTicket',
        component: () => import('../views/core/paciente/ticket/Detail.vue'),
        meta: {
          enfermeroMedico: true,
          idValido: true,
        },
      },
      /******** Cita Medica (Agenda Atención) ********/
      {
        path: 'agenda-atencion',
        name: 'ListAgendaAtencion',
        component: () => import('../views/core/agendaAtencion/List.vue'),
        meta: {
          enfermeroMedicoTratante: true,
        },
      },
      /******** Medico Tratante ********/
      {
        path: 'medico-tratante/diagnostico/actualizar/:idCitaMedica',
        name: 'EditDiagnostico',
        component: () => import('../views/core/medicoTratante/diagnostico/Edit.vue'),
        meta: {
          medicoTratante: true,
          idValido: true,
        },
      },
      {
        path: 'medico-tratante/diagnostico/detalles/:idCitaMedica',
        name: 'DetailDiagnostico',
        component: () => import('../views/core/medicoTratante/diagnostico/Detail.vue'),
        meta: {
          enfermeroMedico: true,
          idValido: true,
        },
      },
      /******** Consulta Médica ********/
      {
        path: 'consulta-medica/detalles/:idCitaMedica',
        name: 'DetailConsulta',
        component: () => import('../views/core/consultaMedica/Detail.vue'),
        meta: {
          enfermeroMedico: true,
          idValido: true,
        },
      },
      /******** Medico Epecialista ********/
      {
        path: 'medico-especialista/consulta',
        name: 'ListConsultaMedica',
        component: () => import('../views/core/medicoEspecialista/List.vue'),
        meta: {
          medicoEspecialista: true,
        },
      },
      {
        path: 'medico-especialista/atencion/:idCitaMedica',
        name: 'AtenderConsultaMedica',
        component: () => import('../views/core/medicoEspecialista/Atencion.vue'),
        meta: {
          medicoEspecialista: true,
          idValido: true,
        },
      },
      /******** Historia Clinica ********/
      {
        path: 'historia-clinica/:idPaciente',
        name: 'historiaClinica',
        component: () => import('../views/core/historiaClinica/Index.vue'),
        meta: {
          requiresAuth: true,
          enfermeroMedico: true,
        },
        children: [
          {
            path: 'datos-familiares',
            name: 'DatosFamiliares',
            meta: {
              criterioNino: true,
              mismoPaciente: true
            },
            component: () => import('../views/core/historiaClinica/DatosFamiliares.vue'),
          },
          {
            path: 'antecedentes-perinatales',
            name: 'AntecedentesPerinatales',
            component: () => import('../views/core/historiaClinica/AntecedentesPerinatales.vue'),
            meta: {
              criterioNino: true,
              mismoPaciente: true
            },
          },
          {
            path: 'antecedentes-familiares-y-personales',
            name: 'AntecedentesFamiliaresYPersonales',
            component: () => import('../views/core/historiaClinica/AntecedentesFamiliaresYPersonales.vue'),
            meta: {
              mismoPaciente: true
            },
          },
          {
            path: 'vacunas',
            name: 'Vacunas',
            component: () => import('../views/core/historiaClinica/Vacunas.vue'),
            meta: {
              criterioNinoAdolescente: true,
              mismoPaciente: true
            }
          },
          {
            path: 'control-de-crecimiento',
            name: 'ControlDeCrecimiento',
            component: () => import('../views/core/historiaClinica/ControlDeCrecimiento.vue'),
            meta: {
              criterioNino: true,
              mismoPaciente: true
            },
          },
          {
            path: 'tamizaje',
            name: 'Tamizaje',
            component: () => import('../views/core/historiaClinica/Tamizaje.vue'),
            meta: {
              criterioNino: true,
              mismoPaciente: true
            },
          },
          {
            path: 'plan-de-atencion-integral',
            name: 'PlanDeAtencionIntegral',
            component: () => import('../views/core/historiaClinica/PlanDeAtencionIntegral.vue'),
            meta: {
              criterioNino: true,
              mismoPaciente: true
            },
          },
          {
            path: 'evaluacion-de-alimentacion',
            name: 'EvaluacionDeAlimentacion',
            component: () => import('../views/core/historiaClinica/EvaluacionDeAlimentacion.vue'),
            meta: {
              criterioNino: true,
              mismoPaciente: true
            },
          },
          {
            path: 'psicosociales',
            name: 'Psicosociales',
            component: () => import('../views/core/historiaClinica/Psicosociales.vue'),
            meta: {
              criterioAdolescenteJoven: true,
              mismoPaciente: true
            },
          },
          {
            path: 'salud-sexual-reproductiva',
            name: 'SaludSexualReproductiva',
            component: () => import('../views/core/historiaClinica/SaludSexualReproductiva.vue'),
            meta: {
              criterioAdolescenteJovenAdulto: true,
              mismoPaciente: true
            },
          },
          {
            path: 'problemas',
            name: 'Problemas',
            component: () => import('../views/core/historiaClinica/Problemas.vue'),
            meta: {
              criterioAdolescenteJovenAdultoAdultoMayor: true,
              mismoPaciente: true
            },
          },
          {
            path: 'prestaciones-de-salud',
            name: 'PrestacionesDeSalud',
            component: () => import('../views/core/historiaClinica/PrestacionesDeSalud.vue'),
            meta: {
              criterioAdolescenteJovenAdultoAdultoMayor: true,
              mismoPaciente: true
            },
          },
          {
            path: 'evaluaciones',
            name: 'Evaluaciones',
            component: () => import('../views/core/historiaClinica/Evaluaciones.vue'),
            meta: {
              criterioAdolescente: true,
              mismoPaciente: true
            },
          },
          {
            path: 'control-preventivo',
            name: 'ControlPreventivo',
            component: () => import('../views/core/historiaClinica/ControlPreventivo.vue'),
            meta: {
              criterioJovenAdultoAdultoMayor: true,
              mismoPaciente: true
            },
          },
          {
            path: 'valoracion-clinica',
            name: 'ValoracionClinica',
            component: () => import('../views/core/historiaClinica/ValoracionClinica.vue'),
            meta: {
              criterioAdultoMayor: true,
              mismoPaciente: true
            },
          },
        ]
      },
      {
        path: '*',
        component: () => import('../views/errors/NoFound.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.noLogged)) {
    const user = ls.getUsuario();
    if (!user) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const user = ls.getUsuario();
    if (user) {
      next();
    } else {
      next({
        name: 'Login'
      });
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.supervisor)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_SUPERVISOR) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.admin)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_ADMINISTRADOR) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.medicoTratante)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_MEDICO_TRATANTE) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.medicoEspecialista)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_MEDICO_ESPECIALISTA) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.enfermero)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_ENFERMERO || idRol == ROL_ENFERMERO_ESPECIALISTA) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.medico)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_MEDICO_TRATANTE || idRol == ROL_MEDICO_ESPECIALISTA) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.enfermeroMedico)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_ENFERMERO || 
      idRol == ROL_ENFERMERO_ESPECIALISTA ||
      idRol == ROL_MEDICO_TRATANTE ||
      idRol == ROL_MEDICO_ESPECIALISTA) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.enfermeroMedicoTratante)) {
    const idRol = parseInt(ls.getIdRol() || '0')
    if (idRol == ROL_ENFERMERO || 
      idRol == ROL_ENFERMERO_ESPECIALISTA ||
      idRol == ROL_MEDICO_TRATANTE) {
      next();
    } else {
      redirectToPrincipal()
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.idValido)) {
    const routeName = to.name
    if (routeName == 'EditDiresa' || routeName == 'EditRedAsistencial' ||
      routeName == 'EditMicroredAsistencial' || routeName == 'EditCentroAsistencial' ||
      routeName == 'EditUsuarioPrincipal' || routeName == 'EditUsuarioSecundario' ||
      routeName == 'EditPaciente') {
      if (esIdPositico(to.params.id)) {
        next();
      }
    }
    if (routeName == 'EditTriaje' || routeName == 'DetailTriaje' ||
      routeName == 'DetailTicket') {
      if (esIdPositico(to.params.idTicket)) {
        next();
      }
    }
    if (routeName == 'EditDiagnostico' || routeName == 'DetailDiagnostico' ||
      routeName == 'DetailConsulta' || routeName == 'AtenderConsultaMedica') {
      if (esIdPositico(to.params.idCitaMedica)) {
        next();
      }
    }
  } else {
    next();
  }
})

/******** Historia Clinica ********/
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.mismoPaciente)) {
    const idPaciente = ls.getIdPaciente() || '0'
    if (idPaciente == to.params.idPaciente) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioNino)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_NINO) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioAdolescente)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_ADOLESCENTE) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioAdultoMayor)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_ADULTO_MAYOR) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioNinoAdolescente)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_NINO || criterio == CRITERIO_ADOLESCENTE) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioAdolescenteJoven)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_ADOLESCENTE || criterio == CRITERIO_JOVEN) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioAdolescenteJovenAdulto)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_ADOLESCENTE || 
      criterio == CRITERIO_JOVEN ||
      criterio == CRITERIO_ADULTO) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioAdolescenteJovenAdultoAdultoMayor)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_ADOLESCENTE || 
      criterio == CRITERIO_JOVEN ||
      criterio == CRITERIO_ADULTO ||
      criterio == CRITERIO_ADULTO_MAYOR) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.criterioJovenAdultoAdultoMayor)) {
    const criterio = parseInt(ls.getCriterioPaciente() || '0')
    if (criterio == CRITERIO_JOVEN ||
      criterio == CRITERIO_ADULTO ||
      criterio == CRITERIO_ADULTO_MAYOR) {
      next();
    } else {
      redirectIndexHistoriaClinica(to.params.idPaciente)
    }
  } else {
    next();
  }
})


export default router
