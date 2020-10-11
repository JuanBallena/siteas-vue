import { 
  ROL_SUPERVISOR, 
  ROL_ADMINISTRADOR, 
  ROL_ENFERMERO, 
  ROL_ENFERMERO_ESPECIALISTA, 
  ROL_MEDICO_TRATANTE, 
  ROL_MEDICO_ESPECIALISTA 
} from '@/common/rolDefinition'
import router from '@/router/index'
import * as ls from '@/localStorage/index'
import * as swal from "@/plugins/sweetAlertMessages"

export function redirectToPrincipal() {
  const idRol = parseInt(ls.getIdRol() || '0')
  
  switch (idRol) {
    case ROL_SUPERVISOR:
      router.push({ name: 'ListDiresa' })
      break;
    case ROL_ADMINISTRADOR:
      router.push({ name: 'ListUsuarioSecundario' })
      break;
    case ROL_ENFERMERO:
      router.push({ name: 'ListPaciente' })
      break;
    case ROL_ENFERMERO_ESPECIALISTA:
      router.push({ name: 'ListPaciente' })
      break;
    case ROL_MEDICO_TRATANTE:
      router.push({ name: 'ListAgendaAtencion' })
      break;
    case ROL_MEDICO_ESPECIALISTA:
      router.push({ name: 'ListConsultaMedica' })
      break;
    default:
      router.push({ name: 'EditPassword' })
      break;
  }
}

export function verifiedCambiarPassword(flag: any) {
  if (flag == 1) {
    router.push({ name: 'ChangePassword' })
  } else {
    redirectToPrincipal()
  }
  ls.removeUsuarioxCentro()
}

export function redirectIndexHistoriaClinica(idPaciente: any) {
  router.push({ name: 'historiaClinica', params: { idPaciente: idPaciente} })
}

export function esIdPositico(id: string) {
  if (parseInt(id) > 0) {
    return true
  } else {
    swal.errorMessage('Identificador inválido.')
    redirectToPrincipal()
  }
}

export function logout() {
  ls.removeSesion()
  setTimeout(() => {
    router.push({ name: 'Login'})
  }, 1000);
}
