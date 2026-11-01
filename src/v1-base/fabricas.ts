/**
 * FÁBRICAS del patrón Abstract Factory (versión 1).
 *
 * - Fábrica abstracta: FabricaInformes declara un método de creación por cada tipo de informe.
 * - Fábricas concretas: una por categoría; cada una crea la familia completa de su categoría.
 */
import {
  CompraEntrada,
  CompraSalida,
  FacturaEntrada,
  FacturaSalida,
  InformeCompra,
  InformeFactura,
} from './productos';

/** Fábrica abstracta. */
export interface FabricaInformes {
  crearFactura(): InformeFactura;
  crearCompra(): InformeCompra;
}

/** Fábrica concreta de la familia ENTRADA. */
export class FabricaEntrada implements FabricaInformes {
  crearFactura(): InformeFactura {
    return new FacturaEntrada();
  }
  crearCompra(): InformeCompra {
    return new CompraEntrada();
  }
}

/** Fábrica concreta de la familia SALIDA. */
export class FabricaSalida implements FabricaInformes {
  crearFactura(): InformeFactura {
    return new FacturaSalida();
  }
  crearCompra(): InformeCompra {
    return new CompraSalida();
  }
}
