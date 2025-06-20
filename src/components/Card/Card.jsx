import React from 'react';
import { useState, useEffect } from 'react';
import './Card.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import useShop from '../../ShopContext';

function Card({ image, title, price, category, link }) {
  const navigate = useNavigate();
  const { products, currentProductId, addBase, addTopping, addExtra } = useShop();
  const [isSelected, setIsSelected] = useState(false);
  const basePath = import.meta.env.VITE_BASE_PATH || '';

  useEffect(() => {
    const currentProduct = products.find(p => p.id === currentProductId);

    if (category === 'base') {
      setIsSelected(currentProduct && currentProduct.base === title);
    }
    else if (category === 'topping') {
      setIsSelected(currentProduct && currentProduct.toppings.includes(title));
    }
    else if (category === 'extra') {
      setIsSelected(currentProduct && currentProduct.extras.includes(title));
    }
  }, [products, currentProductId, title, category]);

  const handleButtonClick = () => {
    const item = {
      title,
      price,
      image,
      category,
    };

    if (category === 'base') {
      addBase(item);
      navigate('/select-topping');
    } else if (category === 'topping') {
      addTopping(item);
    } else if (category === 'extra') {
      addExtra(item);
    }
  };

  let buttonText = '';
  if (category === 'base') buttonText = 'Select base';
  else if (category === 'topping') buttonText = 'Add topping';
  else if (category === 'extra') buttonText = 'Add extra';

  return (
    <article className="card">
      <img className="card__image" src={`${basePath}/${image}`} alt={title} />
      <p className="card__title">{title}</p>
      <p className="card__price">€{Number(price).toFixed(2)}</p>
      <Button
        onClick={handleButtonClick}
        variant={category === 'base' ? 'select' : (isSelected ? 'selected' : 'select')}
        icon={
          category === 'base'
            ? (isSelected ? 'icon_check-brand' : 'icon_check')
            : (isSelected ? 'icon_check-brand' : 'icon_plus')
        }
        text={isSelected ? "Added" : buttonText}
      />
    </article>
  );
}

export default Card;