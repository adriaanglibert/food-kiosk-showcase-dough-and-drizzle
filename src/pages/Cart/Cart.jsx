import React from 'react'
import './Cart.css'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import Title from '../../components/Titles/Title'
import CardOrderList from '../../components/CardOrder/CardOrderList'
import useShop from '../../ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Cart() {
  const { products, total, startNewProduct } = useShop();
  const navigate = useNavigate();

  const handleStartOrdering = () => {
    startNewProduct();
    navigate('/select-base');
  };

  const handleOrderMore = () => {
    startNewProduct();
    navigate('/select-base');
  };

  return (
    <div className="cart">
      <header className="cart__header">
        <Title color="brand">Your order</Title>
      </header>
      <main className="cart__main">
        <AnimatePresence mode="wait">
          {products.length > 0 ? (
            <motion.div
              key="cart-content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -1000 }}
              transition={{ duration: 0.3 }}
            >
              <CardOrderList items={products} />

              <section className="cart__total">
                <p>Total price: €{total.toFixed(2)}</p>
              </section>

              <section className="cart__buttons">
                <Button
                  variant="horizontal"
                  icon="icon_cookie"
                  text='Order more cookies'
                  onClick={handleOrderMore}
                />
                <Button
                  variant="horizontal"
                  icon="icon_checkout"
                  text='Place my order'
                  to='/payment'
                />
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              className="cart__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p>Your cart is empty</p>
              <Button
                variant="horizontal"
                icon="icon_cookie"
                text='Start ordering'
                onClick={handleStartOrdering}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Cart