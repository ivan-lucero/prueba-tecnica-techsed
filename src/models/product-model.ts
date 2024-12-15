import { MeasurementUnitTypes, SalesUnitTypes } from "../types";

export interface ProductModel {
  id: string | number;
  title: string;
  description: string;
  price: number;
  listingPrice?: number;
  stock: number;
  salesUnit: SalesUnitTypes;
  measurementUnit?: MeasurementUnitTypes;
  unitValue?: number;
  img?: string;
}
