// Versión 1: informes de ENTRADA y SALIDA, cada uno con FACTURAS y COMPRAS.
// Cada fábrica crea la familia completa de informes de una categoría.

// Productos abstractos

export abstract class Factura {
  abstract procesar(archivo: string): void;
}

export abstract class Compra {
  abstract procesar(archivo: string): void;
}

// Familia de ENTRADA

export class FacturaEntrada extends Factura {
  procesar(archivo: string): void {
    console.log(`Procesando informe de ENTRADA de tipo FACTURA (${archivo}): se registra la factura recibida del proveedor`);
  }
}

export class CompraEntrada extends Compra {
  procesar(archivo: string): void {
    console.log(`Procesando informe de ENTRADA de tipo COMPRA (${archivo}): se registra la mercancía que llegó al inventario`);
  }
}

// Familia de SALIDA

export class FacturaSalida extends Factura {
  procesar(archivo: string): void {
    console.log(`Procesando informe de SALIDA de tipo FACTURA (${archivo}): se emite la factura al cliente`);
  }
}

export class CompraSalida extends Compra {
  procesar(archivo: string): void {
    console.log(`Procesando informe de SALIDA de tipo COMPRA (${archivo}): se envía la orden de compra al proveedor`);
  }
}

// Fábrica abstracta

export abstract class FabricaInformes {
  abstract crearFactura(): Factura;
  abstract crearCompra(): Compra;
}

// Fábricas concretas

export class FabricaEntrada extends FabricaInformes {
  crearFactura(): Factura {
    return new FacturaEntrada();
  }
  crearCompra(): Compra {
    return new CompraEntrada();
  }
}

export class FabricaSalida extends FabricaInformes {
  crearFactura(): Factura {
    return new FacturaSalida();
  }
  crearCompra(): Compra {
    return new CompraSalida();
  }
}

// Cliente: recibe los nombres de los informes y las fábricas disponibles.
// No sabe qué clase concreta se crea; solo pide una factura o una compra a la fábrica.

export function procesarInformes(reports: string[], fabricas: Record<string, FabricaInformes>): void {
  for (const archivo of reports) {
    const [categoria, tipo] = archivo.split('_');
    const fabrica = fabricas[categoria];

    if (!fabrica) {
      console.log(`No se puede procesar ${archivo}: la categoría ${categoria} no existe`);
      continue;
    }

    if (tipo === 'FAC') {
      fabrica.crearFactura().procesar(archivo);
    } else if (tipo === 'COM') {
      fabrica.crearCompra().procesar(archivo);
    } else {
      console.log(`No se puede procesar ${archivo}: el tipo ${tipo} no existe`);
    }
  }
}

// Programa principal

if (require.main === module) {
  const reports = [
    'ENT_FAC_001.txt',
    'ENT_COM_001.txt',
    'SAL_FAC_001.txt',
    'SAL_COM_001.txt',
    'MIX_FAC_001.txt', // esta categoría todavía no existe
  ];

  const fabricas = {
    ENT: new FabricaEntrada(),
    SAL: new FabricaSalida(),
  };

  console.log('Versión 1: categorías ENTRADA y SALIDA\n');
  procesarInformes(reports, fabricas);
  console.log();
}
