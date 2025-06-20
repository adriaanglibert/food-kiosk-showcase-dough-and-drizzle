import React, { useState } from 'react'
import './LanguageMenu.css'
import { motion } from 'framer-motion'

const languages = [
  { code: 'en', img: './images/language_uk.png', alt: 'English', label: 'Switch to English' },
  { code: 'nl', img: './images/language_nl.webp', alt: 'Nederlands', label: 'Switch to Dutch' },
  { code: 'fr', img: './images/language_fr.jpg', alt: 'Français', label: 'Switch to French' },
  { code: 'de', img: './images/language_de.svg', alt: 'Deutsch', label: 'Switch to German' },
];

const buttonMotion = {
  whileTap: { scale: 0.90 }
};

function LanguageMenu() {
  const [selected, setSelected] = useState('en');
  const selectedLang = languages.find(l => l.code === selected);
  const basePath = import.meta.env.VITE_BASE_PATH || '';

  return (
    <nav className="language-menu" aria-label="Language selector">
      <input
        type="checkbox"
        id="language-toggle"
        className="language-menu__checkbox"
        hidden
      />
      <motion.label
        htmlFor="language-toggle"
        className="language-menu__current"
        aria-label="Change language"
        {...buttonMotion}
      >
        <img src={`${basePath}/${selectedLang.img}`} alt={`Selected language: ${selectedLang.alt}`} />
      </motion.label>
      <ul className="language-menu__list">
        {languages.filter(l => l.code !== selected).map(lang => (
          <li className="language-menu__item" key={lang.code}>
            <motion.button
              className="language-menu__button"
              aria-label={lang.label}
              onClick={() => {
                setSelected(lang.code);
                document.getElementById('language-toggle').checked = false; // close menu
              }}
              {...buttonMotion}
            >
              <img src={`${basePath}/${lang.img}`} alt={lang.alt} />
            </motion.button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LanguageMenu