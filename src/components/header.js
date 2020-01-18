import React, { useContext } from 'react';
import { Link } from 'gatsby';
import Toggle from 'react-toggle';
import { ThemeContext } from 'styled-components';

import headerStyles from './header.module.css';
import './toggle.css';

const Header = ({ handleThemeSwitching, isLight, title }) => {

  const themeContext = useContext(ThemeContext);

  if (!title) {
    title = 'Portfolio';
  }

  return (
    <header className={headerStyles.header}>
      <nav 
        className={headerStyles.nav}
      >
        <ul className={headerStyles.navList}>
          <li>
            <Link 
              className={headerStyles.navItem} 
              activeStyle={{
                color: (isLight === 'light') ? 'black' : 'rgb(253, 253, 253)'
              }}
              to="/"
            >Home</Link></li>
          <li>
            <Link 
              className={headerStyles.navItem} 
              activeStyle={{
                color: (isLight === 'light') ? 'black' : 'rgb(253, 253, 253)'
              }}
              to="/blog"
            >Blog</Link></li>
          <li>
            <Link 
              className={headerStyles.navItem} 
              activeStyle={{
                color: (isLight === 'light') ? 'black' : 'rgb(253, 253, 253)'
              }}
              to="/about"
            >About</Link></li>
          <li>
            <Link 
              className={headerStyles.navItem} 
              activeStyle={{
                color: (isLight === 'light') ? 'black' : 'rgb(253, 253, 253)'
              }}
              to="/contact"
            >Contact</Link></li>
        </ul>
        <div>
          <Toggle
            defaultChecked={isLight === 'light'}
            aria-label="Theme switcher"
            onChange={handleThemeSwitching}
          />
        </div>
      </nav>
      <h1>
        <Link 
          className={headerStyles.title} 
          to="/"
          style={{
            color: themeContext.text
          }}
        >
          {title}
        </Link>
      </h1>
    </header>
  );
}

export default Header;