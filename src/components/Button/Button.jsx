import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const buttonMotion = {
  whileTap: { scale: 0.90 }
};

function Button({ variant, icon, text, to, onClick }) {
  const buttonClass = `button button--${variant}`;
  const iconClass = `button--${variant}__icon`;
  const textClass = `button--${variant}__text`;
  const basePath = import.meta.env.VITE_BASE_PATH || '';

  if (onClick && to) {
    return (
      <motion.button
        className={buttonClass}
        onClick={onClick}
        {...buttonMotion}
      >
        {icon && <img className={iconClass} src={`${basePath}/images/${icon}.svg`} alt="" />}
        <span className={textClass}>{text}</span>
      </motion.button>
    );
  }

  if (onClick) {
    return (
      <motion.button
        className={buttonClass}
        onClick={onClick}
        {...buttonMotion}
      >
        {icon && <img className={iconClass} src={`${basePath}/images/${icon}.svg`} alt="" />}
        <span className={textClass}>{text}</span>
      </motion.button>
    );
  }

  if (to) {
    return (
      <motion.div {...buttonMotion}>
        <Link to={to} className={buttonClass}>
          {icon && <img className={iconClass} src={`${basePath}/images/${icon}.svg`} alt="" />}
          <span className={textClass}>{text}</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={buttonClass}
      {...buttonMotion}
    >
      {icon && <img className={iconClass} src={`${basePath}/images/${icon}.svg`} alt="" />}
      <span className={textClass}>{text}</span>
    </motion.button>
  );
}

export default Button;