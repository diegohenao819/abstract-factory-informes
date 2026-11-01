/**
 * VERSIÓN 1 (Ejercicio 2): categorías ENTRADA y SALIDA, tipos FACTURA y COMPRA.
 */
import { FabricaEntrada, FabricaInformes, FabricaSalida } from './fabricas';
import { ProcesadorInformes } from './procesador';

// Único punto donde se asocia cada prefijo de categoría con su fábrica concreta.
const fabricas: Record<string, FabricaInformes> = {
  ENT: new FabricaEntrada(),
  SAL: new FabricaSalida(),
};

const reports: string[] = [
  'ENT_FAC_001.txt',
  'ENT_COM_001.txt',
  'SAL_FAC_001.txt',
  'SAL_COM_001.txt',
  'MIX_FAC_001.txt', // aún no soportado en v1
  'informe_sin_formato.txt',
];

console.log('=== Versión 1: ENTRADA / SALIDA x FACTURA / COMPRA ===');
new ProcesadorInformes(fabricas).procesarInformes(reports);
console.log();
