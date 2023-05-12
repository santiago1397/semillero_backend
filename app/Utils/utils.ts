export const enumErrors = {
  DEFAULT: 'Un error ha ocurrido en el servidor',
  ERROR_CREATE: 'Error al crear el registro',
  ERROR_SELECT: 'Error al consultar el registro',
  ERROR_UPDATE: 'Error al actualizar el registro',
  ERROR_DELETE: 'Error al eliminar el registro',
  FILE_NOT_UPLOADED: 'Error al cargar el archivo de datos'
}

export const enumSuccess = {
  CREATE: 'Se ha registrado un nuevo registro',
  UPDATE: 'Se ha actualizado el registro exitosamente',
  DELETE: 'Se ha eliminado el registro exitosamente',
  LOGOUT: 'Ha cerrado sesion exitosamente',
  UPDATEPASSWORD: 'La contraseña ha sido actualiza exitosamente'
}

export interface IPagination {
  skip: number
  take: number
}

export const mapToPagination = (pagination: IPagination | null): IPagination => {
  const skip = Number(pagination?.skip) || Number(0)
  const take = Number(pagination?.take) || Number(10)
  return { skip, take }
}
