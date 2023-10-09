import { AlbumsStore } from '@/context/Albums'
import Image from 'next/image'
import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import { useRouter } from 'next/navigation'

const ArtistCard = ({ img, name, followers, rating, id, accessToken }) => {
    const ratingOverFive = rating / 20
    const { setAlbums, setArtistName } = useContext(AlbumsStore)
    const router = useRouter()
    const getAlbums = async () => {
        const url = 'https://api.spotify.com/v1/artists/' + id + '/albums'

        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };

        await fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.items)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setArtistName(name)
        router.push('/albums', { scroll: false })

    }

    return (
        <div className='border w-[300px] h-[450px]'>
            <div className='cursor-pointer w-[300px] h-[300px] relative' onClick={getAlbums}>
                {
                    img ? <Image fill src={img} alt='artist image' quality={100}/>
                        :
                        <Image src='/images/avatar-placeholder.png' fill alt='artist image' />
                }

            </div>
            <div className='p-3'>
                <div className='flex flex-col gap-2 py-2'>
                    <span className='text-2xl font-semibold'>{name}</span>
                    <span className='opacity-80'>{followers.toLocaleString()} followers</span>
                </div>
                <StarRatings
                    rating={ratingOverFive}
                    starDimension="22px"
                    starSpacing="1px"
                    starRatedColor="rgba(226,157,67,255)"
                />
            </div>

        </div>
    )
}

export default ArtistCard