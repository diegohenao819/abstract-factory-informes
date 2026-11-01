/**
 * PRODUCTOS del patrón Abstract Factory (versión 1).
 *
 * - Productos abstractos: InformeFactura e InformeCompra.
 * - Productos concretos: una implementación por cada combinación categoría × tipo.
 */

/** Comportamiento común a cualquier informe. */
export interface Informe {
  procesar(archivo: string): string;
}

/** Producto abstracto A: informes de tipo FACTURA. */
export interface InformeFactura extends Informe {}

/** Producto abstracto B: informes de tipo COMPRA. */
export interface InformeCompra extends Informe {}

// ---------- Familia ENTRADA ----------

export class FacturaEntrada implements InformeFactura {
  procesar(archivo: string): string {
    return `Procesando informe de ENTRADA de tipo FACTURA [${archivo}] -> registrando factura recibida de proveedor`;
  }
}

export class CompraEntrada implements InformeCompra {
  procesar(archivo: string): string {
    return `Procesando informe de ENTRADA de tipo COMPRA [${archivo}] -> registrando mercancía recibida en inventario`;
  }
}

// ---------- Familia SALIDA ----------

export class FacturaSalida implements InformeFactura {
  procesar(archivo: string): string {
    return `Procesando informe de SALIDA de tipo FACTURA [${archivo}] -> emitiendo factura al cliente`;
  }
}

export class CompraSalida implements InformeCompra {
  procesar(archivo: string): string {
    return `Procesando informe de SALIDA de tipo COMPRA [${archivo}] -> enviando orden de compra al proveedor`;
  }
}
