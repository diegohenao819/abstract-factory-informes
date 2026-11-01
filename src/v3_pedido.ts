// Versión 3: se agrega el tipo PEDIDO a la categoría ENTRADA.
// Aquí no basta con agregar clases: la fábrica abstracta necesita un método nuevo
// y por eso hay que cambiar todas las fábricas y también el cliente.
// Los cambios respecto a las versiones anteriores están señalados con "Nuevo".

// Productos abstractos

export abstract class Factura {
  abstract procesar(archivo: string): void;
}

export abstract class Compra {
  abstract procesar(archivo: string): void;
}

// Nuevo: producto abstracto para los pedidos
export abstract class Pedido {
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

// Nuevo: solo la categoría ENTRADA tiene pedidos
export class PedidoEntrada extends Pedido {
  procesar(archivo: string): void {
    console.log(`Procesando informe de ENTRADA de tipo PEDIDO (${archivo}): se registra el pedido que hizo el cliente`);
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

// Fábrica abstracta

export abstract class FabricaInformes {
  abstract crearFactura(): Factura;
  abstract crearCompra(): Compra;
  abstract crearPedido(): Pedido; // Nuevo: obliga a cambiar todas las fábricas
}

// Fábricas concretas

export class FabricaEntrada extends FabricaInformes {
  crearFactura(): Factura {
    return new FacturaEntrada();
  }
  crearCompra(): Compra {
    return new CompraEntrada();
  }
  // Nuevo
  crearPedido(): Pedido {
    return new PedidoEntrada();
  }
}

export class FabricaSalida extends FabricaInformes {
  crearFactura(): Factura {
    return new FacturaSalida();
  }
  crearCompra(): Compra {
    return new CompraSalida();
  }
  // Nuevo: SALIDA no tiene pedidos, pero igual debe tener este método
  crearPedido(): Pedido {
    throw new Error('la categoría SALIDA no maneja pedidos');
  }
}

export class FabricaMixta extends FabricaInformes {
  crearFactura(): Factura {
    return new FacturaMixta();
  }
  crearCompra(): Compra {
    return new CompraMixta();
  }
  // Nuevo: MIXTA no tiene pedidos, pero igual debe tener este método
  crearPedido(): Pedido {
    throw new Error('la categoría MIXTA no maneja pedidos');
  }
}

// Cliente

export function procesarInformes(reports: string[], fabricas: Record<string, FabricaInformes>): void {
  for (const archivo of reports) {
    const [categoria, tipo] = archivo.split('_');
    const fabrica = fabricas[categoria];

    if (!fabrica) {
      console.log(`No se puede procesar ${archivo}: la categoría ${categoria} no existe`);
      continue;
    }

    try {
      if (tipo === 'FAC') {
        fabrica.crearFactura().procesar(archivo);
      } else if (tipo === 'COM') {
        fabrica.crearCompra().procesar(archivo);
      } else if (tipo === 'PED') {
        // Nuevo
        fabrica.crearPedido().procesar(archivo);
      } else {
        console.log(`No se puede procesar ${archivo}: el tipo ${tipo} no existe`);
      }
    } catch (error) {
      console.log(`No se puede procesar ${archivo}: ${(error as Error).message}`);
    }
  }
}

// Programa principal

if (require.main === module) {
  const reports = [
    'ENT_FAC_001.txt',
    'ENT_COM_001.txt',
    'ENT_PED_001.txt',
    'SAL_FAC_001.txt',
    'SAL_COM_001.txt',
    'MIX_FAC_001.txt',
    'MIX_COM_001.txt',
    'SAL_PED_001.txt', // SALIDA no tiene pedidos
  ];

  const fabricas = {
    ENT: new FabricaEntrada(),
    SAL: new FabricaSalida(),
    MIX: new FabricaMixta(),
  };

  console.log('Versión 3: se agrega el tipo PEDIDO en ENTRADA\n');
  procesarInformes(reports, fabricas);
  console.log();
}
