import React from 'react'
import './Grid.css'
import Card from '../Card/Card';
import { motion, AnimatePresence } from 'framer-motion';


function Grid({ items = [] }) {
  return (
    <section className="grid">
      <AnimatePresence mode='wait'>
        {items.map((item, index) => {
          let link;
          if (item.category === 'base') {
            link = '/select-topping';
          }

          return (
            <motion.div
              key={item.title.replace(/\s+/g, '-').toLowerCase() + '-' + index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Card
                image={item.image}
                title={item.title}
                price={item.price}
                category={item.category}
                link={link}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </section>
  );
}

export default Grid