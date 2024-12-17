import React, { useState } from 'react';
import usePriceFormat from '../../utils/hooks/usePriceFormat.tsx';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
import Discount from '../discount/Discount.tsx';
import { Button } from '@mui/material';
import { ProductModel } from '../../utils/models/product-model.ts';
import useCartStore from '../../store/cart-store.ts';
import ProductInput from './components/ProductInput.tsx';

interface Props {
  product: ProductModel
}

const ProductItem = (prop: Props) => {
  const { items } = useCartStore()
  const cartItem = items.find((item) => item.product.id === prop.product.id)
  //TODO: revisar si es necesario useState product
  const [product, setProduct] = useState(prop.product)
  const price = usePriceFormat({ amount: product.price });
  const listingPrice = usePriceFormat({ amount: product.listingPrice || 0 });
  const unitPrice = usePriceFormat({
    amount: product.unitValue ? product.price / product.unitValue : 0,
  });

  

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
          {product.stock - ((cartItem && cartItem.quantity)|| 0)  >= 1 ? (
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
          <ProductInput product={product} cartItem={cartItem || null} />
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
