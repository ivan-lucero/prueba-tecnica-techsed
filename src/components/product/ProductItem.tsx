import React from 'react';
import { products } from '../../data/products.ts';
import usePriceFormat from '../../utils/hooks/usePriceFormat.tsx';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
import Discount from '../discount/Discount.tsx';
import { TextField, Button } from '@mui/material';
import { ProductModel } from '../../models/product-model.ts';
import { SalesUnitTypes } from '../../types/types.ts';

interface Props {
  product: ProductModel
}

const ProductItem = ({ product }: Props) => {
  const price = usePriceFormat({ amount: product.price });
  const listingPrice = usePriceFormat({ amount: product.listingPrice || 0 });
  const unitPrice = usePriceFormat({
    amount: product.unitValue ? product.price / product.unitValue : 0,
  });

  //TODO: Sepparar en archivo aparte, carpeta inputs
  const renderInputs = (salesUnit: SalesUnitTypes) => {
    switch (salesUnit) {
      case "group":
        return (
          <div className='mt-4 flex gap-6'>
            <div>
              <p className='font-bold'>Cantidad de unidades</p>
              <div className='flex items-center gap-2'>
                <TextField className='w-20' defaultValue={0} type='number' size='small' />
                <span className='text-base font-bold opacity-50'>Unidades</span>
              </div>
            </div>
            <div>
              <p className='font-bold'>Cantidad de pallets</p>
              <div className='flex items-center gap-2'>
                <Button variant="outlined" color='inherit'>-</Button>
                <TextField className='w-20' defaultValue={0} size='small' />
                <Button variant="outlined" color='inherit'>+</Button>
              </div>
            </div>
          </div>
        )

      case "area":
        return (
          <div className='mt-4 flex gap-6'>
            <div>
              <p className='font-bold'>Superficie</p>
              <div className='flex items-center gap-2'>
                <TextField className='w-20' defaultValue={0} type='number' size='small' />
                <span className="text-base font-bold opacity-50">M<sup>2</sup></span>
              </div>
            </div>
            <div>
              <p className='font-bold'>Cantidad de cajas</p>
              <div className='flex items-center gap-2'>
                <Button variant="outlined" color='inherit'>-</Button>
                <TextField className='w-20' defaultValue={0} size='small' />
                <Button variant="outlined" color='inherit'>+</Button>
              </div>
            </div>
          </div>
        )

      case "unit":
        return (
          <div className='mt-4 flex gap-6'>
            <div>
              <p className='font-bold'>Cantidad</p>
              <div className='flex items-center gap-2'>
                <Button variant="outlined" color='inherit'>-</Button>
                <TextField className='w-20' defaultValue={0} size='small' />
                <Button variant="outlined" color='inherit'>+</Button>
                <span className='text-base font-bold opacity-50'>Unidades</span>
              </div>
            </div>
          </div>
        )
    }
  }
  //TODO: Modularizar estilos de tailwind con @apply
  return (
    <article className="grid grid-cols-3 gap-8">
      <div className="col-span-1 ">
        <div className='flex items-center justify-center h-full'>
          <img src={product.img} alt={product.title} />
        </div>
      </div>
      <div className="col-span-2">
        <div className="font-bold uppercase opacity-35">sku: {product.id}</div>
        <div className="text-2xl font-bold">{product.title}</div>
        <div className="text-base font-bold">
          {product.stock > 0 ? (
            <p className='flex items-center gap-1'>
              <CheckCircleOutlineIcon className="text-green-500" /> Stock disponible
            </p>
          ) : (
            <p className='flex items-center gap-1'><DoDisturbAltRoundedIcon className='text-red-500' /> Sin stock</p>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <span className="text-2xl font-bold">{price}</span>
          {
            product.listingPrice && (product.price < product.listingPrice) &&
            <Discount listingPrice={product.listingPrice} price={product.price} />
          }
        </div>
        {product.unitValue && product.unitValue > 0 && (
          <div className="text-base font-bold opacity-50">PU: {unitPrice}</div>
        )}
        {
          product.listingPrice &&
          <p className="text-xl font-bold line-through opacity-35">{listingPrice}</p>
        }
        <div>
          {
            renderInputs(product.salesUnit)
          }
        </div>

        <p className='py-4 font-medium opacity-50'>
          {product.description}
        </p>
        <div className='w-1/3 flex flex-col gap-2'>
          <Button variant='contained' color='primary'>Comprar ahora</Button>
          <Button variant='outlined' color='primary'>Eliminar del carrito</Button>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
