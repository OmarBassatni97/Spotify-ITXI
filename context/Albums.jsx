'use client'
import { createContext, useState } from "react";

const AlbumsStore = createContext()

const AlbumsProvider = ({ children }) => {
    const [albums, setAlbums] = useState([])
    const [artistName, setArtistName] = useState('')
    return (
        <AlbumsStore.Provider value={{ albums, setAlbums, artistName, setArtistName }}>{children}</AlbumsStore.Provider>
    )
}

export { AlbumsProvider, AlbumsStore }