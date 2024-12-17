import React from 'react'
import { CartItem } from '../../utils/models/cart-model'
import usePriceFormat from '../../utils/hooks/usePriceFormat.tsx';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useCartStore from '../../store/cart-store.ts';

interface Props {
  item: CartItem
}

const CartProduct = ({ item }: Props) => {
  const { removeFromCart } = useCartStore()
  const price = usePriceFormat({ amount: item.product.price });

  return (
    <div className='grid grid-cols-4 gap-8 max-w-6xl'>
      <div className='col-span-1 flex items-center justify-center'>
        <img className='max-w-24' src={item.product.img} alt={item.product.title} />
      </div>
      <div className='col-span-2'>
        <div className="text-xl font-semibold">{item.product.title}</div>
        <div className="text-xl font-bold mt-2">{price}</div>
      </div>
      <div className='col-span-1 flex justify-end items-center'>
        <IconButton aria-label="delete" color='error'
          onClick={() => removeFromCart(item.product.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default CartProduct