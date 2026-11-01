/**
 * Utilidad compartida por las tres versiones: interpreta el nombre de un informe
 * con el formato CAT_TIPO_nombre.txt (p. ej. ENT_FAC_001.txt).
 *
 * Solo separa las partes; decidir si la categoría o el tipo existen es
 * responsabilidad del procesador de cada versión.
 */
export interface NombreInforme {
  categoria: string; // ENT, SAL, MIX...
  tipo: string;      // FAC, COM, PED...
  nombre: string;    // 001
}

const PATRON = /^([A-Z]+)_([A-Z]+)_(.+)\.txt$/;

export function parsearNombre(archivo: string): NombreInforme {
  const coincidencia = PATRON.exec(archivo);
  if (!coincidencia) {
    throw new Error(`nombre con formato inválido (se espera CAT_TIPO_nombre.txt)`);
  }
  const [, categoria, tipo, nombre] = coincidencia;
  return { categoria, tipo, nombre };
}
