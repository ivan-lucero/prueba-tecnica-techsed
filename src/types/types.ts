/**
 * Representa los diferentes tipos de unidades de venta para los productos.
 *
 * - **group**: Los productos que se venden en agrupaciones definidas, como por ejemplo, ladrillos que se venden por pallet,
 *   donde cada pallet contiene una cantidad específica de unidades.
 * - **unit**: Los productos que se venden de manera individual, permitiendo seleccionar cantidades específicas.
 * - **area**: Los productos que requieren especificar un área total en m² (por ejemplo, mediante un campo de texto),
 *   que se traduce automáticamente en una cantidad de unidades a comprar.
 */
export type SalesUnitTypes = "group" | "unit" | "area";

/**
 * Representa las diferentes unidades de medida disponibles para los productos.
 *
 * - **m2**: Unidad de medida en metros cuadrados, utilizada para productos relacionados con áreas.
 * - **m**: Unidad de medida en metros lineales, utilizada para productos como cables o tubos.
 * - **pallet**: Agrupaciones predefinidas de productos, como un conjunto de ladrillos.
 * - **bolson**: Unidad que representa productos vendidos en bolsas grandes, como arena o cemento.
 */
export type MeasurementUnitTypes = "m2" | "m" | "pallet" | "bolson";
