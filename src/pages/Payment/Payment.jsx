import React from 'react'
import './Payment.css'
import Button from '../../components/Button/Button'
import Title from '../../components/Titles/Title'
import Subtitle from '../../components/Titles/Subtitle'

function Payment() {
  return (
    <div className="payment">
      <main className="payment__main">
        <Title color="dark-contrast">Where do you<br />wish to pay?</Title>

        <section>
          <Subtitle color="dark-contrast">At kiosk</Subtitle>
          <Button variant="square" icon="pay-card" text='Card' to='/confirmation'/>
        </section>

        <h2 className="lead-text text-dark-contrast">or</h2>

        <section>
          <Subtitle color="dark-contrast">At counter</Subtitle>
          <Button variant="square" icon="pay-cash" text='Cash' to='/confirmation'/>
        </section>
      </main>
        
      <footer className="payment__back-button">
        <Button variant="horizontal" icon="icon_cookie" text='Go back' to='/cart'/>
      </footer>
    
    </div>
  )
}

export default Payment