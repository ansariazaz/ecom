import React from 'react'
import './loader.css'
const Loader = () => {
    return (
        <div className='cont'>
            <div className='loader'>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
                <span>Loading....</span>
            </div>
        </div>
    )
}

export default Loader