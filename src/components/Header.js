import React, { useEffect, useState } from 'react';
import './Header.css';
import Logo from '../assets/todo-list-icon-13.jpg';

const themes = ['space', 'clinical', 'blueprint', 'mocha', 'midnight'];

export const Header = () => {
  const [theme, setTheme] = useState('space');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'space';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <div className="logo-title">
        <img src={Logo} alt="logo" className="logo" />
        <h1 className={`title gradient-title ${theme}`}>TaskMate</h1>
      </div>
      <div className="theme-switcher">
        {themes.map((t) => (
          <div
            key={t}
            className={`theme-circle ${t} ${theme === t ? 'active' : ''}`}
            onClick={() => handleThemeChange(t)}
            title={t}
          ></div>
        ))}
      </div>
    </header>
  );
};