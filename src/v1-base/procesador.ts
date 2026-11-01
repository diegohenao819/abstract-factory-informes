/**
 * CLIENTE del patrón Abstract Factory (versión 1).
 *
 * El procesador solo conoce las interfaces abstractas (FabricaInformes e Informe):
 * nunca hace `new FacturaEntrada()` ni similares. La relación prefijo -> fábrica
 * se le inyecta desde fuera (main.ts).
 */
import { parsearNombre } from '../comun/nombreArchivo';
import { FabricaInformes } from './fabricas';
import { Informe } from './productos';

export class ProcesadorInformes {
  constructor(private readonly fabricas: Record<string, FabricaInformes>) {}

  procesarInformes(archivos: string[]): void {
    for (const archivo of archivos) {
      try {
        const informe = this.crearInforme(archivo);
        console.log(`  OK  ${informe.procesar(archivo)}`);
      } catch (error) {
        console.log(`  ERR ${archivo}: ${(error as Error).message}`);
      }
    }
  }

  private crearInforme(archivo: string): Informe {
    const { categoria, tipo } = parsearNombre(archivo);

    // 1) La categoría selecciona la fábrica concreta (familia).
    const fabrica = this.fabricas[categoria];
    if (!fabrica) {
      throw new Error(`categoría desconocida "${categoria}"`);
    }

    // 2) El tipo selecciona qué producto de esa familia se crea.
    switch (tipo) {
      case 'FAC':
        return fabrica.crearFactura();
      case 'COM':
        return fabrica.crearCompra();
      default:
        throw new Error(`tipo de informe desconocido "${tipo}"`);
    }
  }
}
