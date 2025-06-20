import React from 'react'
import useShop from '../../ShopContext';
import { motion } from 'framer-motion';

const buttonMotion = {
  whileTap: { scale: 1.5 }
};

function CardOrderCounter({ quantity, orderId }) {
  const { updateQuantity, removeProduct } = useShop();

  const handleIncrement = () => {
    updateQuantity(orderId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(orderId, quantity - 1);
    } else {
      removeProduct(orderId);
    }
  };

  return (
    <div className="card-order__counter">
        <motion.button 
          aria-label="Decrease quantity" 
          onClick={handleDecrement}
          {...buttonMotion}
        >
            <img src="./images/icon_minus.svg" alt=""/>
        </motion.button>
        <span>{quantity}</span>
        <motion.button 
          aria-label="Increase quantity" 
          onClick={handleIncrement}
          {...buttonMotion}
        >
            <img src="./images/icon_plus.svg" alt=""/>
        </motion.button>
    </div>  
  )
}

export default CardOrderCounter