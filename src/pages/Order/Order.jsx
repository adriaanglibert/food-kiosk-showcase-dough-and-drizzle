import React from 'react'
import './Order.css'
import Button from '../../components/Button/Button'
import Title from '../../components/Titles/Title'
import Subtitle from '../../components/Titles/Subtitle'
import useShop from '../../ShopContext';
import { useNavigate } from 'react-router-dom';

function Order() {
  const { startNewProduct, finalizeProduct } = useShop();
  const navigate = useNavigate();
  const basePath = import.meta.env.VITE_BASE_PATH || '';

  const handleOrderMore = () => {
    startNewProduct();
    navigate('/select-base');
  };

  const handleGoToCart = () => {
    finalizeProduct();
    navigate('/cart');
  };

  return (
    <div className="order">
      <header className="order__header">
        <Title color="dark-contrast">That is one good cookie!</Title>
        <Subtitle color="dark-contrast">Our bakers are jealous of your ingenuity...</Subtitle>
      </header>

      <main className="order__main">
        <img className="order__gif" src={`${basePath}/images/gif.webp`} alt="Filled cookie jar emptying fast" />

        <Button variant="horizontal" icon="icon_cookie" text='Order more cookies' onClick={handleOrderMore} />
        <Button variant="horizontal" icon="icon_cart_small" text='Go to cart' onClick={handleGoToCart} />

      </main>

    </div>
  )
}

export default Order