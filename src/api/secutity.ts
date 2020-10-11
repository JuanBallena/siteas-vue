import * as swal from '@/plugins/sweetAlertMessages'
import * as ls  from "@/localStorage/index";

export function getAuthorization() {
  const token = ls.getToken()
  const config = {
    headers: {
      'Authorization': token
    }
  }
  return config
}

export function responseCodeIsCero(responseCode: any) {
  switch (responseCode) {
    case "0":
      return true
    case "1":
      swal.errorMessage('Error general al guardar base de datos.')
      break;
    case "10":
      swal.errorMessage('Credenciales invalidas.')
      break;
    case "11":
      swal.errorMessage('Argumentos invalidos o insuficientes.')
      break;
    case "12":
      swal.errorMessage('Usuario no activo.')
      break;
    case "21":
      swal.errorMessage('Usuario con DNI existente.')
      break;
    case "22":
      swal.errorMessage('Usuario con username existente.')
      break;
    case "23":
      swal.errorMessage('Usuario no existe.')
      break;
    case "24":
      swal.errorMessage('Usuario con email existente.')
      break;
    case "25":
      swal.errorMessage('Contraseña no coincide.')
      break;
    case "26":
      swal.errorMessage('Contraseña esta vacía.')
      break;
    case "31":
      swal.errorMessage('Diresa con nombre existente.')
      break;
    case "32":
      swal.errorMessage('Diresa no existe.')
      break;
    case "41":
      swal.errorMessage('Red Asistencial con nombre existente en la DIRESA.')
      break;
    case "42":
      swal.errorMessage('Red Asistencial no existe.')
      break;
    case "51":
      swal.errorMessage('Microred Asistencial con nombre ya existe en la RED.')
      break;
    case "52":
      swal.errorMessage('Microred Asistencial no existe.')
      break;
    case "61":
      swal.errorMessage('Usuario ya registrado a dicho centro de Asistencial.')
      break;
    case "71":
      swal.errorMessage('Centro Asistencial con nombre ya existe en Microred.')
      break;
    case "72":
      swal.errorMessage('Centro Asistencial no existe.')
      break;
    case "73":
      swal.errorMessage('Usuario no registrado en dicho centro.')
      break;
    case "81":
      swal.errorMessage('Ticket no existe.')
      break;
    case "82":
      swal.errorMessage('Estado del Ticket no permite esta acción.')
      break;
    case "83":
      swal.errorMessage('Ticket no pertence a este centro asistencial.')
      break;
    case "91":
      swal.errorMessage('Paciente no existe.')
      break;
    case "92":
      swal.errorMessage('Paciente con dni existente.')
      break;
    case "99":
      swal.errorMessage('Error general.')
      break;
    case "101":
      swal.errorMessage('Ticket de proceso no existe.')
      break;
    case "102":
      swal.errorMessage('Cita no existe.')
      break;
    case "103":
      swal.errorMessage('Estado de cita no admite edición de estos datos.')
      break;
    case "104":
      swal.errorMessage('Atención médica se excedió en archivos adjuntos.')
      break;
    case "105":
      swal.errorMessage('Error al guardar el archivo adjunto.')
      break;
    case "106":
      swal.errorMessage('Archivo indicado no válido.')
      break;
    case "107":
      swal.errorMessage('Error al intentar eliminar el archivo.')
      break;
    case "111":
      swal.errorMessage('Atención médica se excedió en consultas médicas.')
      break;
    case "112":
      swal.errorMessage('Consulta médica no existe.')
      break;
    case "113":
      swal.errorMessage('Atención médica es tratada por otro médico.')
      break;
    case "114":
      swal.errorMessage('Consulta médica viene siendo atendida por otro médico.')
      break;
    case "121":
      swal.errorMessage('Evaluacion de alimentacion no existe.')
      break;
    case "122":
      swal.errorMessage('Evaluacion de alimentacion cuenta con Id.')
      break;
    case "123":
      swal.errorMessage('Historia Clinica y Rango de edad no corresponden al Id de la Evaluacion.')
      break;
    case "131":
      swal.errorMessage('Vacuna ya registrada para el paciente.')
      break;
    case "141":
      swal.errorMessage('Tipo de control de crecimiento ya registrado para el paciente.')
      break;
    case "151":
      swal.errorMessage('Tipo de tamizaje ya registrado para el paciente.')
      break;
    case "161":
      swal.errorMessage('Antecedente educativo para este nivel ya existe.')
      break;
    default:
      swal.errorMessage('Error del sistema.')
    break;
  }
}