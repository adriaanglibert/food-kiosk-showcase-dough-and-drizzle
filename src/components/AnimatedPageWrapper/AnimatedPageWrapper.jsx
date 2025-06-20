import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedPageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        type: "spring",
        bounce: 0.4,
        damping: 7,
        stiffness: 100,
        mass: 0.8
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPageWrapper