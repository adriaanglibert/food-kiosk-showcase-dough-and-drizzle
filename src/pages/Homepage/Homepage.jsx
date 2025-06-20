import React from 'react';
import './Homepage.css';
import LanguageMenu from '../../components/LanguageMenu/LanguageMenu';
import Button from '../../components/Button/Button';
import Title from '../../components/Titles/Title';
import Subtitle from '../../components/Titles/Subtitle';

function Homepage() {
  const basePath = import.meta.env.VITE_BASE_PATH || '';

  return (
    <div className="homepage">
      <header className="homepage__header">
        <LanguageMenu />
      </header>

      <main className="homepage__main">
        <Title color="dark-contrast">Welcome to<br />Dough & Drizzle</Title>
        <Subtitle color="dark-contrast">Order here</Subtitle>

        <section className="homepage__buttons">
          <Button variant="square" icon="cutlery" text='Eat In' to='/select-base' />
          <Button variant="square" icon="basket" text='Take Out' to='/select-base' />
        </section>
      </main>

      <footer className="homepage__footer">
        <img src={`${basePath}/images/images_footer.png`} alt="decorative image with cookies" />
      </footer>
    </div>
  );
}

export default Homepage;