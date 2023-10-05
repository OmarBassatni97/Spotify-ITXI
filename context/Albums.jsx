'use client'
import { createContext, useState } from "react";

const AlbumsStore = createContext()

const AlbumsProvider = ({ children }) => {
    const [albums, setAlbums] = useState([])
    return (
        <AlbumsStore.Provider value={{ albums, setAlbums }}>{children}</AlbumsStore.Provider>
    )
}

export { AlbumsProvider, AlbumsStore }