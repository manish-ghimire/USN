import React from 'react'
import './Card.scss'

const Card = ({ children, height }) => {
  return (
    <div className='cardbox' style={{ height: height }}>
      {children}
    </div>
  )
}

export default Card
