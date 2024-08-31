// Header.jsx
import React, { useState } from 'react';
import Head from './Head';
import './header.css';
import { useAuth0 } from '@auth0/auth0-react';

const Header = ({ navigate }) => {
  const [click, setClick] = useState(false);
  const { logout } = useAuth0();

  const handleNavigation = (path) => {
    setClick(false);
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path; // Fallback navigation using window.location.href
    }
  };

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul
            className={click ? 'mobile-nav' : 'flexSB'}
            onClick={() => setClick(false)}
          >
            <li>
              <a
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/');
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='/courses'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/courses');
                }}
              >
                All Courses
              </a>
            </li>
            <li>
              <a
                href='/about'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/about');
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href='/team'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/team');
                }}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href='/pricing'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/pricing');
                }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href='/contact'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          {/* <div className='start'>
            <div className='button'>
              <a
                href='/onlineTest'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/onlineTest');
                }}
              >
                APPLY FOR TEST
              </a>
            </div>
          </div> */}
          <div className='start'>
            <div className='button'>
              <a
                href='/onlinetest'
                onClick={(e) => {
                  console.log('object');
                  e.preventDefault();
                  handleNavigation('/onlinetest');
                }}
              >
                APPLY FOR TEST
              </a>
            </div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? (
              <i className='fa fa-times'></i>
            ) : (
              <i className='fa fa-bars'></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
