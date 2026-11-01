# Sistema de procesamiento de informes con el patrón Abstract Factory

Actividad 1 de la asignatura Reutilización de Software (UNIR): Patrones de creación.

El programa recibe una lista de nombres de informes y procesa cada uno según su categoría y su tipo. Para crear el informe correcto en cada caso se usa el patrón Abstract Factory.

## Cómo ejecutarlo

Solo se necesita tener instalado Node.js (versión 18 o superior).

```bash
npm install
```

Después se puede ejecutar cada versión por separado:

```bash
npm run v1
```

```bash
npm run v2
```

```bash
npm run v3
```

O las tres seguidas:

```bash
npm start
```

## El problema

Los informes llegan con nombres como ENT_FAC_001.txt. La primera parte indica la categoría y la segunda el tipo:

| Archivo | Categoría | Tipo |
|---|---|---|
| ENT_FAC_001.txt | ENTRADA | FACTURA |
| ENT_COM_001.txt | ENTRADA | COMPRA |
| SAL_FAC_001.txt | SALIDA | FACTURA |
| SAL_COM_001.txt | SALIDA | COMPRA |

Cada combinación de categoría y tipo se procesa de una manera distinta.

## Cómo está resuelto

Cada categoría es una familia de informes y tiene su propia fábrica. La fábrica de ENTRADA crea la factura y la compra de entrada, y la fábrica de SALIDA crea las de salida. El cliente solo le pide a la fábrica "una factura" o "una compra", sin saber qué clase concreta recibe.

| Papel en el patrón | Clases |
|---|---|
| Fábrica abstracta | FabricaInformes |
| Fábricas concretas | FabricaEntrada, FabricaSalida, FabricaMixta |
| Productos abstractos | Factura, Compra, Pedido |
| Productos concretos | FacturaEntrada, CompraSalida, FacturaMixta, etc. |
| Cliente | procesarInformes |

## Archivos

Cada versión está en un archivo distinto dentro de la carpeta src, para poder comparar cómo evoluciona el sistema:

| Archivo | Ejercicio | Qué contiene |
|---|---|---|
| v1_base.ts | Ejercicio 2 | Categorías ENTRADA y SALIDA con facturas y compras |
| v2_mixta.ts | Ejercicio 3a | Agrega la categoría MIXTA |
| v3_pedido.ts | Ejercicio 3b | Agrega el tipo PEDIDO en la categoría ENTRADA |

En la carpeta docs/uml están los diagramas de clases de cada versión, escritos en PlantUML. Se pueden ver pegando el contenido en el editor de https://www.plantuml.com/plantuml o con la extensión PlantUML de VS Code.

## Lo que muestra la evolución

Agregar la categoría MIXTA fue sencillo. La versión 2 importa todo lo de la versión 1 sin cambiar nada y solo añade dos informes nuevos y su fábrica.

Agregar el tipo PEDIDO fue más costoso. La fábrica abstracta necesitó un método nuevo, crearPedido, y por eso hubo que cambiar las tres fábricas concretas y el cliente. Además, SALIDA y MIXTA quedaron obligadas a tener ese método aunque no manejan pedidos, así que lanzan un error si se les pide uno.

## Referencias

Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). *Design patterns: Elements of reusable object-oriented software*. Addison-Wesley.

Shvets, A. (s. f.). *Abstract Factory*. Refactoring.Guru. https://refactoring.guru/es/design-patterns/abstract-factory
