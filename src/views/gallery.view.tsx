import React, { memo, useMemo } from 'react'
import { Loading } from '../components/Loading'
import { currentImage, galleryImages, galleryStatus, getGalleryAction, updateCurrentImage } from '../features/gallery/gallery.slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const Gallery = () => {
  const gallery = useAppSelector(galleryImages)
  const currentImg = useAppSelector(currentImage)
  const galleryLoading = useAppSelector(galleryStatus)
  const dispatch = useAppDispatch()

  useMemo(() => {
    dispatch(getGalleryAction())
  }, [])

  if(galleryLoading === 'loading') return <Loading />

  if(galleryLoading === 'failed') return (
    <div className='bg-gray-700 text-center p-10 m-10 rounded-lg text-white'>
      <h3 className='text-2xl font-semibold mb-2'>OOPS!</h3>
      <p className='font-base'>Something went wrong while fetching gallery. Please retry after sometime.</p>
    </div>
  )

  return (
    <section className={`container mx-auto py-5 flex justify-between gap-2`}>
      <div className='grid grid-cols-5 gap-3 pr-10'>
        {gallery.map(img => 
          <div className='cursor-pointer' onClick={() => dispatch(updateCurrentImage(img.id))}>
              <img height={150} width={150} className="rounded" src={img.url} alt={'sample file to be displayed'} loading="lazy" />
          </div>
        )}
      </div>
      <div className='bg-gray-50 rounded-lg p-20'>
        <img src={currentImg?.url} alt="current gallery item" />
        <h4 className='text-3xl text-center mt-3'>{currentImg?.title}</h4>
      </div>
    </section>
  )
}

export default memo(Gallery);