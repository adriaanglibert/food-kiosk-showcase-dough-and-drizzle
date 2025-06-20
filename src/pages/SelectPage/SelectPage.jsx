import React from 'react'
import './SelectPage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import base from '../../data/bases.json';
import topping from '../../data/toppings.json';
import extra from '../../data/extras.json';

import Grid from '../../components/Grid/Grid';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import Title from '../../components/Titles/Title';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Category from '../../components/Category/Category';

import useShop from '../../ShopContext';

const data = {
  base: {
    title: 'Choose your base',
    progress: 1,
    items: base,
    categories: [
      { value: 'all', name: 'All types', icon: 'icon_infinity' },
      { value: 'cookie', name: 'Cookies', icon: 'icon_cookie' },
      { value: 'brownie', name: 'Brownies', icon: 'icon_brownie' },
      { value: 'cake', name: 'Cakes', icon: 'icon_cake' },
    ],
  },
  topping: {
    title: 'Choose toppings',
    progress: 2,
    items: topping,
    categories: [
      { value: 'all', name: 'All types', icon: 'icon_infinity' },
      { value: 'ganache', name: 'Ganaches', icon: 'icon_ganache' },
      { value: 'buttercream', name: 'Creams', icon: 'icon_buttercream' },
      { value: 'glaze', name: 'Glazes', icon: 'icon_glaze' }
    ],
  },
  extra: {
    title: 'Choose extras',
    progress: 3,
    items: extra,
    categories: [
      { value: 'all', name: 'All types', icon: 'icon_infinity' },
      { value: 'chocolate', name: 'Chocolate', icon: 'icon_chocolate' },
      { value: 'crunch', name: 'Crunch', icon: 'icon_crunchy' },
      { value: 'fruit', name: 'Fruit', icon: 'icon_fruity' }
    ],
  }
}

function SelectPage({ step }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { currentProductId } = useShop();
  const navigate = useNavigate();

  const activeStep = data[step];

  // If we're on the topping or extra page but don't have a current product, redirect to base
  if ((step === 'topping' || step === 'extra') && !currentProductId) {
    navigate('/select-base');
    return null;
  }

  const filteredItems = activeStep.items.filter(item =>
    activeCategory === 'all' ||
    (Array.isArray(item.type)
      ? item.type.includes(activeCategory)
      : item.type === activeCategory)
  );

  const handleConfirm = () => {
    if (step === 'topping') {
      navigate('/select-extra');
    } else if (step === 'extra') {
      navigate('/order');
    }
  };

  return (
    <div className="select-page">
      <header className="select-page__header">
        <Title color="brand">{activeStep.title}</Title>
        <ProgressBar currentStep={activeStep.progress} />
      </header>

      <main className="select-page__main">
        <Category
          categories={activeStep.categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />

        <Grid items={filteredItems} />

        {['topping', 'extra'].includes(step) && (
          <section className="select-page__confirm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 100 }}
            >
              <motion.div
                animate={{ rotate: [-3, 3, -3, 3, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 5, // Wait 3 seconds before repeating
                  ease: "easeInOut"
                }}
              >
                <Button
                  variant="horizontal"
                  icon="icon_check-dark"
                  text={`Confirm ${step}s`}
                  onClick={handleConfirm}
                />
              </motion.div>
            </motion.div>
          </section>
        )}
      </main>
    </div>
  );
}

export default SelectPage
