import React from 'react'
import CardOrder from './CardOrder'
import { AnimatePresence } from 'framer-motion'

function CardOrderList({ items = [], onRemoveStart }) {
  return (
    <div className='cart__cards'>
      <AnimatePresence mode="popLayout" onExitComplete={onRemoveStart}>
        {items.map((item) => (
          <CardOrder
            key={item.id}
            order={item}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default CardOrderList