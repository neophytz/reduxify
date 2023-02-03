import React, { memo } from 'react'
import { addCartItem, cartItems, removeCartItem } from '../features/products.slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { bg } from '../util/constant';

const Cart = () => {
  const dispatch = useAppDispatch();
  const allCartItem = useAppSelector(cartItems);

  return (
    <section className="container mx-auto p-5 my-4">
      <div className='grid grid-cols-2'>
        <div className='bg-gray-0 p-2 mr-5'>
          {
            allCartItem.map(item => (
              <div key={item.id} className='p-4 grid bg-white grid-cols-4 mb-5 shadow-lg rounded-lg'>
                <div className='col-span-1' style={bg(item.image)}></div>
                <div className='col-span-3 p-2 ml-3'>
                  <h4 className='text-xl font-semibold text-gray-800'>{item.title}</h4>
                  <p className='text-md text-gray-600 text-justify'>{item.description}</p>
                  <div className='flex items-center justify-between mt-3'>
                    <span className='font-semibold text-xl'>₹ {item.price}</span>
                    <div className='flex item-middle'>
                      <button onClick={() => dispatch(addCartItem(item.id))} className='mr-3 h-[40px] w-[40px] rounded text-3xl bg-white text-gray-800 hover:bg-gray-100  border border-gray-200'>+</button>
                      <span className='p-2 bg-blue-500 px-4 text-white rounded-full'>Units: {item.quantity}</span>
                      <button onClick={() => dispatch(removeCartItem(item.id))} className='ml-3 h-[40px] w-[40px] rounded text-3xl bg-white text-red-600 hover:bg-red-100  border border-red-200'>-</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='p-3 bg-gray-50 rounded-lg'>
          <h3 className='text-2xl font-semibold flex'> Summary</h3>
        </div>
      </div>
    </section>
  )
}

export default memo(Cart)