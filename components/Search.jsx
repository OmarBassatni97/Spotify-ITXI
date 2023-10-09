'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import ArtistCard from './ArtistCard'
const Search = () => {
    const [accessToken, setAccessToken] = useState("")
    const [searchValue, setSearchValue] = useState()
    const [artists, setArtists] = useState([])
    const { data: session } = useSession({
        required: true
    })
    console.log(session)
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

    const search = async () => {
        if (searchValue) {
            const url = 'https://api.spotify.com/v1/search?q=' + searchValue + '&type=artist';
            const headers = {
                'Authorization': `Bearer ${accessToken}`
            };

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers,
                });
                const data = await response.json();
                setArtists(data.artists.items);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        search();
    }, [searchValue]);
    console.log(artists);
    console.log(searchValue);
    return (
        <div className='w-full flex flex-col justify-center items-center '>
            <div className="flex flex-col items-center justify-center mt-5 max-w-[1440px]">

                <form  className='border p-4 flex justify-center items-center '>
                    <input onChange={(e) => setSearchValue(e.target.value)} type="text" className='outline-none' placeholder='Search for an artist...' />
                    <AiOutlineSearch />
                </form>
                {
                    artists && <div className='w-full grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-4'>
                        {artists?.map((artist, index) => {
                            return (
                                <ArtistCard accessToken={accessToken} id={artist?.id} key={index} img={artist?.images[0]?.url} name={artist?.name} rating={artist?.popularity} followers={artist?.followers.total} />

                            )
                        }
                        )}
                    </div>
                }
            </div>
        </div>

    )
}

export default Search