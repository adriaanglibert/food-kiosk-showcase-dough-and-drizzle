import React, { useEffect } from 'react'
import './Confirmation.css'
import Title from '../../components/Titles/Title'
import Subtitle from '../../components/Titles/Subtitle'
import { useNavigate } from 'react-router';


function Confirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Navigate to the home page
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div className="confirmation">
      <main className="confirmation__main">
        <Title color="dark-contrast">Thank you for<br />your order!</Title>
        <Subtitle color="dark-contrast">Freshly baked happiness is coming<br />your way!</Subtitle>

        <img className="confirmation__gif" src="./images/gif1.gif" alt="Filled cookie jar emptying fast" />

        <small style={{ fontFamily: "'Mada', sans-serif" }} className='text-brand-detail'>In 5 seconds you will be able to buy even more cookies!</small>
      </main>
    </div>
  )
}

export default Confirmation