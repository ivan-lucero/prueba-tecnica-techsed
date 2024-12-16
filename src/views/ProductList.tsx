import React, { useEffect } from 'react'
import ProductItem from '../components/product/ProductItem.tsx'
import useProductStore from '../store/product-store.ts'
import { productsData } from '../utils/data/products-data.ts'

const ProductList = () => {
  const {setProducts, products} = useProductStore()
  
    useEffect(() => {
      setProducts(productsData)
    }, [products])
  
  return (
    <div className='grid gap-6'>
      {
        products.map(product => {
          return <ProductItem product={product} key={product.id} />
        })
      }
    </div>
  )
}

export default ProductList