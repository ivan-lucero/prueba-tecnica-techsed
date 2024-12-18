import React from 'react'
import useCartStore from '../store/cart-store.ts'
import CartProduct from '../components/cart-product/CartProduct.tsx'
import { Button } from '@mui/material'
import useProductStore from '../store/product-store.ts'
import usePriceFormat from '../utils/hooks/usePriceFormat.tsx'
import Swal from 'sweetalert2'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link } from 'react-router'

const CartList = () => {
  const { items, clearCart } = useCartStore()
  const { updateProductStock } = useProductStore()
  const totalPrice = usePriceFormat({
    amount: items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0)
  })
  const buyItems = () => {
    items.forEach(item => {
      updateProductStock(item.product.id, -item.quantity)
    });
    clearCart()
    Swal.fire({
      title: "Se ha completado la compra",
      icon: "success",
    });
  }

  return (
    <div>
      <Button >
        <Link to={"/"}>
          <ArrowBackRoundedIcon fontSize='small' /> volver a la lista
        </Link>
      </Button>
      <h1 className='title mt-4'>Carrito de compras</h1>
      <div className='mt-6'>
      </div>
      {
        items.length ?
          <div>
            <div className='grid gap-12 mb-16'>
              {items.map((item, i) => {
                return (
                  <CartProduct key={i} item={item} />
                )
              })}
            </div>
            <div className='font-bold text-2xl text-center py-6'>
              Precio total: {totalPrice}
            </div>
            <div className='flex justify-center'>
              <Button className='w-1/2' color='primary' variant='contained' onClick={buyItems}>Comprar</Button>
            </div>
          </div>
          :
          <div className='text-lg text-center font-bold'>No hay elementos agregados al carrito</div>
      }

    </div>
  )
}

export default CartList