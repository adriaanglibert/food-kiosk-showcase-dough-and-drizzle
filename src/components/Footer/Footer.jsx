import React from 'react';
import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useShop from '../../ShopContext';

const iconMotion = {
  whileTap: { scale: 0.90 }
};

function Footer({ className, activePage }) {
  const navigate = useNavigate();
  const { startNewProduct, products } = useShop();
  const basePath = import.meta.env.VITE_BASE_PATH || '';

  const handleSelectBaseClick = (e) => {
    e.preventDefault();
    startNewProduct();
    navigate('/select-base');
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    startNewProduct();
    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  return (
    <div className={className}>
      <nav className="footer" aria-label="Main navigation">
        <ul className="footer__list">
          <li>
            <motion.div {...iconMotion}>
              <a
                href="/"
                onClick={handleHomeClick}
                className={`footer__element ${activePage === 'Homepage' ? 'footer__element--active' : ''}`}
                aria-label="Go to homepage"
              >
                <img
                  className="footer__icon"
                  src={`${basePath}/images/icon_home.svg`}
                  alt=""
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </li>
          <li>
            <motion.div {...iconMotion}>
              <a
                href="/select-base"
                onClick={handleSelectBaseClick}
                className={`footer__element ${activePage === 'SelectPage' ? 'footer__element--active' : ''}`}
                aria-label="Go to menu"
              >
                <img
                  className="footer__icon"
                  src={activePage === 'SelectPage' ? `${basePath}/images/icon_menu.svg` : `${basePath}/images/icon_menu_light.svg`}
                  alt=""
                  aria-hidden="true"
                />
                <p>{activePage === 'SelectPage' ? 'Menu' : ''}</p>
              </a>
            </motion.div>
          </li>
          <li>
            <motion.div {...iconMotion}>
              <Link
                to="/cart"
                className={`footer__element ${activePage === 'Cart' ? 'footer__element--active' : ''}`}
                aria-label="Go to cart"
              >
                <div className='footer__cart-icon'>
                  <img
                    className="footer__icon"
                    src={activePage === 'Cart' ? `${basePath}/images/icon_cart_dark.svg` : `${basePath}/images/icon_cart.svg`}
                    alt=""
                    aria-hidden="true"
                  />
                  {products.length > 0 && (
                    <span className="footer__cart-count">
                      {products.reduce((total, product) => total + product.quantity, 0)}
                    </span>
                  )}
                </div>


                <p>{activePage === 'Cart' ? 'Cart' : ''}</p>
              </Link>
            </motion.div>
          </li>
        </ul>
      </nav>
    </div>

  );
}

export default Footer;
