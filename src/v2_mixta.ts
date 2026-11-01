// Versión 2: se agrega la categoría MIXTA.
// Basta con crear sus dos informes y su fábrica. Todo lo demás se reutiliza
// de la versión 1 tal como está, sin cambiar ninguna línea.

import { Compra, Factura, FabricaEntrada, FabricaInformes, FabricaSalida, procesarInformes } from './v1_base';

// Familia MIXTA

export class FacturaMixta extends Factura {
  procesar(archivo: string): void {
    console.log(`Procesando informe MIXTO de tipo FACTURA (${archivo}): se comparan las facturas emitidas con las recibidas`);
  }
}

export class CompraMixta extends Compra {
  procesar(archivo: string): void {
    console.log(`Procesando informe MIXTO de tipo COMPRA (${archivo}): se cruzan las órdenes enviadas con la mercancía recibida`);
  }
}

// Fábrica concreta nueva

export class FabricaMixta extends FabricaInformes {
  crearFactura(): Factura {
    return new FacturaMixta();
  }
  crearCompra(): Compra {
    return new CompraMixta();
  }
}

// Programa principal

if (require.main === module) {
  const reports = [
    'ENT_FAC_001.txt',
    'ENT_COM_001.txt',
    'SAL_FAC_001.txt',
    'SAL_COM_001.txt',
    'MIX_FAC_001.txt',
    'MIX_COM_001.txt',
    'ENT_PED_001.txt', // este tipo todavía no existe
  ];

  const fabricas = {
    ENT: new FabricaEntrada(),
    SAL: new FabricaSalida(),
    MIX: new FabricaMixta(), // única línea nueva en la configuración
  };

  console.log('Versión 2: se agrega la categoría MIXTA\n');
  procesarInformes(reports, fabricas);
  console.log();
}
