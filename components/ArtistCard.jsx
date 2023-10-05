import Image from 'next/image'
import React from 'react'

const ArtistCard = ({ img, name, followers, rating }) => {
    return (
        <div className='border w-[300px] h-[350px]'>
            <div >
                <Image className='h-[200px]' height={100} width={300} src={img} alt='artist image' />
            </div>
            <div className='p-3'>
                <div className='flex flex-col gap-2 py-2'>
                    <span className='text-2xl font-semibold'>{name}</span>
                    <span className='opacity-80'>{followers.toLocaleString()} followers</span>
                </div>
                <span>{rating}</span>
            </div>

        </div>
    )
}

export default ArtistCard