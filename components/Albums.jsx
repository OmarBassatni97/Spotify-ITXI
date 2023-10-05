'use client'
import React, { useContext } from 'react'
import { AlbumsStore } from '@/context/Albums'
import AlbumCard from './AlbumCard'

const Albums = () => {
    const { albums } = useContext(AlbumsStore)
    console.log(albums);
    return (
        <div className='w-full flex justify-center items-center my-5'>
            <div className='max-w-[1440px] grid grid-cols-4 gap-4'>
                {
                    albums ? albums?.items?.map((album, index) => (
                        <AlbumCard key={index} img={album?.images[0]?.url} preview={album?.uri} name={album?.name} date={album?.release_date} tracks={album?.total_tracks} artist={album?.artists[0].name}/>
                    ))
                    : <span>NO ALBUMS, PLEASE SEARCH AGAIN</span>
                }
            </div>


        </div>
    )
}

export default Albums