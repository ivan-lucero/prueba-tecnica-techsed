import React from 'react'
import ProductItem from '../components/product/ProductItem.tsx'
import { ProductModel } from '../models/product-model.ts'

interface Props {
  products: ProductModel[]
}

const ProductList = ({ products }: Props) => {
  return (
    <div className='grid gap-6'>
      {
        products.map(product => {
          return <ProductItem product={product} />
        })
      }
    </div>
  )
}

export default ProductList