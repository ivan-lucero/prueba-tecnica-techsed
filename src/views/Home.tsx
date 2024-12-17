import React, { useEffect } from 'react'
import ProductItem from '../components/product/ProductItem.tsx'
import useProductStore from '../store/product-store.ts'
import { productsData } from "../utils/data/products-data.ts"
import { Button } from '@mui/material'

const Home = () => {
  const { setProducts, products } = useProductStore()

  useEffect(() => {
    if (products.length === 0) {
      setProducts(productsData)
    }
  }, [products])

  const reset = () => {
    localStorage.removeItem("product-store")
    window.location.reload();
  }

  return (
    <>
      <h1 className='title'>Lista de productos</h1>
      <Button onClick={reset} variant='contained' color='warning'>Reiniciar productos</Button>
      <div className='grid gap-10'>
        {
          products.map(product => {
            return <ProductItem product={product} key={product.id} />
          })
        }
      </div>
    </>
  )
}

export default Home