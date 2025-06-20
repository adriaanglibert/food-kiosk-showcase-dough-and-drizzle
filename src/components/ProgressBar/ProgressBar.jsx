import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgressBar.css';
import useShop from '../../ShopContext';
import { motion } from 'framer-motion';

const stepMotion = {
  whileTap: { scale: 0.9 }
};

function ProgressBar({ currentStep }) {
  const navigate = useNavigate();
  const { startNewProduct } = useShop();

  const handleStepClick = (step) => {
    if (step < currentStep) {
      if (step === 1) {
        startNewProduct();
      }

      switch (step) {
        case 1:
          navigate('/select-base');
          break;
        case 2:
          navigate('/select-topping');
          break;
        case 3:
          navigate('/select-extra');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="progress-bar">
      {[1, 2, 3].map((step) => {
        const StepComponent = step < currentStep ? motion.div : 'div';
        return (
          <StepComponent
            key={step}
            className={`progress-bar__step ${step === currentStep ? 'progress-bar__step--active' : ''} ${step > currentStep ? 'progress-bar__step--not-clickable' : ''}`}
            onClick={() => handleStepClick(step)}
            {...(step < currentStep ? stepMotion : {})}
          >
            {step}
          </StepComponent>
        );
      })}
      <div className="progress-bar__line"></div>
    </div>
  );
}

export default ProgressBar;