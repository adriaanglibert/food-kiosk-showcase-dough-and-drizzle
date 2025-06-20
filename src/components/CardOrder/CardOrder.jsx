import React from 'react'
import './CardOrder.css'
import CardOrderCounter from './CardOrderCounter'
import useShop from '../../ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  initial: { x: 0, opacity: 1 },
  exit: { 
    x: -1000,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

function CardOrder({ order }) {
  return (
    <motion.div 
      className="card-order"
      variants={cardVariants}
      initial="initial"
      exit="exit"
      layout
    >
      <img className="card-order__image" src="./images/order_image4.png" alt="Image of your order"/>
      <div className="card-order__content">
        <ul className="card-order__list">
          <li>{order.base}</li>
          {order.toppings && order.toppings.map((topping, idx) => (
            <li key={`topping-${idx}`}>{topping}</li>
          ))}
          {order.extras && order.extras.map((extra, idx) => (
            <li key={`extra-${idx}`}>{extra}</li>
          ))}
        </ul>
        <p>€{order.totalPrice.toFixed(2)}</p>
      </div>
      <CardOrderCounter 
        quantity={order.quantity}
        orderId={order.id}
      />
      <img className="card-order__bite" src="./images/bite-mark-light-contrast.svg" alt=""/>
    </motion.div>
  )
}

export default CardOrder