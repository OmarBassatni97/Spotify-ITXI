import Image from 'next/image'
import React from 'react'

const ArtistCard = ({img, name, followers, rating}) => {
  return (
    <div>
        <div>
            <Image height={200} width={200} src={img} alt='artist image'/>
        </div>
        <div>
            <span>{name}</span>
            <span>{followers} followers</span>
        </div>
        <span>{rating}</span>
    </div>
  )
}

export default ArtistCard