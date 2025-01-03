import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../../utils/models/index.ts'
import useCartStore from '../../../store/cart-store.ts'
import { Button, TextField } from '@mui/material'
import { CartItem } from '../../../utils/models/cart-model.ts'

interface Props {
  product: ProductModel
  cartItem: CartItem | null
  resetInput?: boolean
}

const ProductInput = ({ product, cartItem, resetInput }: Props) => {
  const { items, addToCart, removeFromCart, updateQuantity } = useCartStore()

  //TODO: Cambiar nombres a sufijo State
  const [cartItemValue, setCartItemValue] = useState(cartItem?.quantity || 0)
  const [quantityUnitValue, setQuantityUnitValue] = useState(
    ((cartItemValue && product.unitValue ? (cartItemValue * product.unitValue) : 0))
  )
  const buttonAdd = () => {
    if (cartItemValue < product.stock) {
      addToCart(product, 1)
      setCartItemValue((prev) => prev + 1)
      if (product && product.unitValue) {
        setQuantityUnitValue(() => (cartItemValue + 1) * product.unitValue!)
      }
    }
  }
  const buttonRemove = () => {
    if (cartItemValue > 0) {
      removeFromCart(product.id, 1)
      setCartItemValue((prev) => prev - 1)
      if (product && product.unitValue) {
        setQuantityUnitValue(() => product.unitValue! * (cartItemValue - 1))
      }
    }
  }

  //TODO: Revisar error al colocar valor 13 en input
  const changeFieldArea = (e) => {
    let area = e.target.value
    setQuantityUnitValue(() => area)
    let autocalculatedQuantity = Number((area / product.unitValue!).toFixed(0))
    if (Number(area) === 0) {
      setCartItemValue(0)
      setQuantityUnitValue(0)
      removeFromCart(product.id)
    }
    if (autocalculatedQuantity >= product.stock) {
      setCartItemValue(product.stock)
      setQuantityUnitValue(product.stock * product.unitValue!)
    }
    else {
      setCartItemValue(() => autocalculatedQuantity)
    }
    if (items.find(item => item.product.id === product.id)) {
      updateQuantity(product.id, autocalculatedQuantity)
    }
    else {
      addToCart(product, autocalculatedQuantity)
    }
  }
  // Resetear valores cuando se recibe la señal
  useEffect(() => {
    if (resetInput) {
      setCartItemValue(0);
      setQuantityUnitValue(0);
    }
  }, [resetInput]);

  switch (product.salesUnit) {
    case "group":
      return (
        <div className='mt-4 flex flex-col md:flex-row gap-6'>
          <div>
            <p className='font-bold'>Cantidad de unidades</p>
            <div className='flex items-center gap-2'>
              <TextField className='w-20' value={quantityUnitValue} type='number' size='small'
                slotProps={{
                  input: {
                    value: quantityUnitValue,
                    role: "textbox",
                    name: "quantity",
                    "aria-label": "quantity-value"
                  }
                }} />
              <span className='text-base font-bold opacity-50'>Unidades</span>
            </div>
          </div>
          <div>
            <p className='font-bold'>Cantidad de
              {product.measurementUnit === "pallet" ? " pallets" : product.measurementUnit === "bolson" ? " bolsones" : ""}
            </p>
            <div className='flex items-center gap-2'>
              <Button variant="outlined" color='inherit' onClick={buttonRemove} disabled={!(cartItemValue > 0)}>-</Button>
              <TextField className='w-20' size='small' value={cartItemValue} slotProps={{
                input: {
                  name: "cartitem"
                },
              }} />
              <Button variant="outlined" color='inherit' onClick={buttonAdd} data-testid="add-button" disabled={!(cartItemValue < product.stock)}>+</Button>
            </div>
          </div>
        </div>
      )

    case "area":
      return (
        <div className='mt-4 flex flex-col md:flex-row gap-6'>
          <div>
            <p className='font-bold'>Superficie</p>
            <div className='flex items-center gap-2'>
              <TextField className='w-20' value={quantityUnitValue} type='number' size='small' onChange={changeFieldArea}
                slotProps={{
                  input: {
                    name: "quantity",
                  },
                }} />
              <span className="text-base font-bold opacity-50">
                {product.measurementUnit === "m2" ? <span>M<sup>2</sup></span> : product.measurementUnit === "m" ? "M" : ""}
              </span>
            </div>
          </div>
          <div>
            <p className='font-bold'>Cantidad de cajas</p>
            <div className='flex items-center gap-2'>
              <Button variant="outlined" color='inherit' onClick={buttonRemove} disabled={!(cartItemValue > 0)}>-</Button>
              <TextField className='w-20' size='small' value={cartItemValue} slotProps={{
                input: {
                  name: "cartitem"
                },
              }} />
              <Button variant="outlined" color='inherit' onClick={buttonAdd} disabled={!(cartItemValue < product.stock)}>+</Button>
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
              <Button variant="outlined" color='inherit' onClick={buttonRemove} disabled={!(cartItemValue > 0)}>-</Button>
              <TextField className='w-20' size='small' value={cartItemValue} slotProps={{
                input: {
                  name: "cartitem"
                },
              }} />
              <Button variant="outlined" color='inherit' onClick={buttonAdd} disabled={!(cartItemValue < product.stock)}>+</Button>
              <span className='text-base font-bold opacity-50'>Unidades</span>
            </div>
          </div>
        </div>
      )
  }
}

export default ProductInput