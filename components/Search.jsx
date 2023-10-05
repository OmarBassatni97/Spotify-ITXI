'use client'
import { data } from 'autoprefixer'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import ArtistCard from './ArtistCard'
const Search = () => {
    const [accessToken, setAccessToken] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [artists, setArtists] = useState([])
    const { data: session } = useSession({

    })
    const url = "https://accounts.spotify.com/api/token"
    const clientID = "5da59371fe7b4dc4ac30a11480706acf"
    const clientSecret = "c58b3aba483b42f995b50cad63e05569"

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    const data = new URLSearchParams()
    data.append("grant_type", "client_credentials")
    data.append("client_id", clientID)
    data.append("client_secret", clientSecret)

    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                setAccessToken(data.access_token)
            })
            .catch((error) => {
                console.error("Error:", error)
            });
    }, [])

    const search = async (e) => {
        e.preventDefault()
        const url = 'https://api.spotify.com/v1/search?q=' + searchValue + '&type=artist'

        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };

        await fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setArtists(data)
            })
            .catch((error) => {
                console.error('Error:', error)
            });
    }
    console.log(artists);
    return (
        <div className="w-full flex items-center justify-center mt-5">
            <form onSubmit={search} className='border p-4 flex justify-center items-center'>
                <input onChange={(e) => setSearchValue(e.target.value)} type="text" className='outline-none' placeholder='Search for an artist...' />
                <AiOutlineSearch />
            </form>
            {
                artists && <div className='w-full grid col-span-4'>
                    {artists?.items?.map((artist, index) => (
                        <ArtistCard key={index} img={artist.images[0].url} name={artist.name} rating={artist.popularity} followers={artist.followers.total} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Search