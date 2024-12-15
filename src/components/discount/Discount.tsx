import React from 'react'

interface Props {
  price: number
  listingPrice: number
}

const Discount = ({ price, listingPrice }: Props) => {
  return (
    <span className='bg-blue-500 px-4 rounded-xl text-white font-medium uppercase'>
      %{Math.abs((((price - listingPrice) / price) * 100)).toFixed(0)} off
    </span>
  )
}

export default Discount
