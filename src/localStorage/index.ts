export function saveTokenLocalStorage(token: any){
  localStorage.setItem('token', token)
}

export function saveUsuarioLocalStorage(user: any) {
  localStorage.setItem('usuario', user.usuario)
  localStorage.setItem('email', user.email)
  localStorage.setItem('idUsuario', user.idUsuario)
  const nombreUsuario = `${user.paterno} ${user.materno} ${user.nombres}`
  localStorage.setItem('nombreUsuario', nombreUsuario)
}

export function saveUsuarioxCentroLocalStorage(usuarioxCentro: any) {
  localStorage.setItem('usuarioxCentro', JSON.stringify(usuarioxCentro))
}

export function saveUsuarioCentroLocalStorage(usuarioCentro: any) {
  localStorage.setItem('idCentroAsistencial', usuarioCentro.centroAsistencial.idCentroAsistencial)
  localStorage.setItem('centroAsistencial', usuarioCentro.centroAsistencial.nombre)
  localStorage.setItem('idRol', usuarioCentro.rol.idRol)
  localStorage.setItem('rol', usuarioCentro.rol.nombre)
  localStorage.setItem('idEspecialidad', usuarioCentro.especialidad.idEspecialidad)
}

export function saveCambiarPassword(flag: any) {
  localStorage.setItem('cambiarPassword', flag)
}

export function saveCriterioPaciente(criterio: string) {
  localStorage.setItem('criterioPaciente', criterio)
}

export function saveIdPaciente(idPaciente: string) {
  localStorage.setItem('idPaciente', idPaciente)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getIdUsuario() {
  return localStorage.getItem('idUsuario')
}

export function getUsuario() {
  return localStorage.getItem('usuario')
}

export function getNombreUsuario() {
  return localStorage.getItem('nombreUsuario')
}

export function getEmail() {
  return localStorage.getItem('email')
}

export function getIdCentroAsistencial() {
  return localStorage.getItem('idCentroAsistencial')
}

export function getCentroAsistencial() {
  return localStorage.getItem('centroAsistencial')
}

export function getIdRol() {
  return localStorage.getItem('idRol')
}

export function getRol() {
  return localStorage.getItem('rol')
}

export function getCambiarPassword() {
  return localStorage.getItem('cambiarPassword')
}

export function getUsuarioxCentro() {
  return localStorage.getItem('usuarioxCentro')
}

export function getIdEspecialidad() {
  return localStorage.getItem('idEspecialidad')
}

export function getCriterioPaciente() {
  return localStorage.getItem('criterioPaciente')
}

export function getIdPaciente() {
  return localStorage.getItem('idPaciente')
}

export function removeCambiarPassword() {
  localStorage.removeItem('cambiarPassword')
}

export function removeUsuarioxCentro() {
  localStorage.removeItem('usuarioxCentro')
}

export function removeSesion() {
  localStorage.removeItem('token')
  localStorage.removeItem('idUsuario')
  localStorage.removeItem('usuario')
  localStorage.removeItem('email')
  localStorage.removeItem('idCentroAsistencial')
  localStorage.removeItem('centroAsistencial')
  localStorage.removeItem('idRol')
  localStorage.removeItem('rol')
  localStorage.removeItem('cambiarPassword')
  localStorage.removeItem('usuarioxCentro')
  localStorage.removeItem('nombreUsuario')
  localStorage.removeItem('isLogged')
  localStorage.removeItem('idEspecialidad')
  localStorage.removeItem('criterioPaciente')
  localStorage.removeItem('idPaciente')
}