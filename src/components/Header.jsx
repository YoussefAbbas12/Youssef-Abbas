import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaSun, FaMoon } from 'react-icons/fa';
import bangzenLogo from '../assets/images/logo.png';
import { useNavbar } from '../contexts/NavbarContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { StaggeredMenu } from './StaggeredMenu';

const CLIP_PATH = 'polygon(0 0, 100% 0, 100% 85%, 68% 85%, 64% 100%, 36% 100%, 32% 85%, 0 85%)';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isNavbarVisible, hideNavbar, showNavbar, isMenuOpen, setIsMenuOpen } = useNavbar();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'dark:bg-slate-900/80 bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 group">
            <img src={bangzenLogo} alt="Logo" className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg dark:text-white text-slate-900 hidden sm:inline">Zain</span>
          </a>

          <nav className={`hidden lg:flex items-center gap-8 ${isNavbarVisible ? 'block' : 'hidden'}`}>
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-semibold text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
