import React from 'react'
import './Card.scss'

const Card = ({ children, height, color }) => {
  return (
    <div className='cardbox' style={{ height: height, backgroundColor: color }}>
      {children}
    </div>
  )
}

export default Card
