import React from 'react'
import './Category.css'
import { motion } from 'framer-motion'

const categoryMotion = {
  whileTap: { scale: 0.90 }
};

function Category({ categories, activeCategory, onCategorySelect }) {
  const basePath = import.meta.env.VITE_BASE_PATH || '';
  return (
    <nav aria-label="Category filter">
      <ul className="category">
        {categories.map((cat) => {
          const isActive = cat.value === activeCategory;
          const buttonClass = `category__button${isActive ? ' category__button--active' : ''}`;

          return (
            <li key={cat.value}>
              <motion.button
                className={buttonClass}
                onClick={() => onCategorySelect(cat.value)}
                {...categoryMotion}
              >
                <figure className="category__icon">
                  <img src={`${basePath}/images/${cat.icon}.svg`} alt={cat.icon} />
                </figure>
                <p className="category__text">{cat.name}</p>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Category;