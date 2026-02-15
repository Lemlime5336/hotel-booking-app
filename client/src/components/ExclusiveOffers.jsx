import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <div>
        <div>
            <Title align='left' title='Exclusive Offers' subtitle='Limited time offers just for you.'/>
            <button>
                View All Offers
                <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all'/>
            </button>
        </div>
    </div>
  )
}

export default ExclusiveOffers