import React, { FC, memo } from 'react'
import { useQuery } from 'react-query';
import { Cart, HalfStar, Star } from '../components/icons';
import { Loading } from '../components/Loading';
import { setProducts } from '../features/products.slice';
import { getProducts } from '../services/product.service';
import { useAppDispatch } from '../store/hooks';


const bg = (image: string) => (
  {
    backgroundImage: `url(${image})`, 
    backgroundSize: 'contain', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center'
  }
)

const truncate = (str: string, len: number = 200): string => {
  return `${str.substring(0, len)}${str.length > len ? '...' : ''}`
}

const Rating: FC<{value: number}> = ({value}) => {
  const fullStar = parseInt(value.toString());
  const doesHalf = value - fullStar >= 0.5 ? true : false;

  let items: number[] = [];
  for (let i = 0; i < fullStar; i++) {
    items.push(i)
  }

  return (
    <div className='flex gap-1'>
      {items.map((el, idx) => <Star key={idx} />)}
      {doesHalf && <HalfStar />}
    </div>
  )
}

const Products = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useQuery('products', getProducts, { // caching!
    onSuccess: (val) => dispatch(setProducts(val)), // state management.
  })

  if(isLoading) return <Loading />

  return (
    <section className={`container mx-auto py-5 flex justify-between`}>
      <div className='grid grid-cols-1 md:grid-col-3 lg:grid-cols-4 sm:grid-cols-2 gap-10'>
        {
          data?.map(product => (
            <div key={product.title} className='border relative border-gray-50 shadow rounded-lg p-3'>
              <div className='min-h-[300px] max-h-[300px]' style={bg(product.image)}></div>
              <div className='mt-3'>
                <h4 className='text-2xl font-semibold text-gray-800'>{truncate(product.title, 25)}</h4>
                <p className='text-md text-gray-600'>{truncate(product.description)}</p>
                <div className='flex justify-between mt-3'>
                  <Rating value={product.rating.rate} />
                  <div className='bg-gray-50 border text-xs border-gray-100 p-1 px-3 rounded-full'>
                    {product.rating.count}
                  </div>
                </div>
              </div>
              <button className='bg-blue-500 rounded absolute top-0 right-0 text-white flex items-center justify-center h-[50px] w-[50px]'>
                <Cart />
              </button>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default memo(Products);