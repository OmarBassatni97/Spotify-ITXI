import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AlbumCard = ({ img, name, date, tracks, preview, artist }) => {
    return (
        <div className='border-2 w-[300px] flex flex-col justify-between'>
            <div>
                <Image src={img} height={100} width={300} alt='album pic' />
            </div>
            <div className='p-4'>
                <div className='flex flex-col gap-2 py-4'>
                    <span className='text-2xl font-semibold'>{name}</span>
                    <span className='opacity-80'>{artist}</span>
                </div>
                <div className='flex flex-col gap-2 py-4'>
                    <span className='opacity-80'>{date}</span>
                    <span className='opacity-80'>{tracks} tracks</span>
                </div>
            </div>

            <div className='bg-gray-300 p-2 flex justify-center items-end border cursor-pointer hover:bg-green-300 duration-300 transition' >
                <Link href={preview} target='_blank'>Preview on Spotify</Link>
            </div>
        </div>
    )
}

export default AlbumCard