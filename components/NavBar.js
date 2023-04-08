/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SymphoMeet from '../images/SymphoMeet.png';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid" style={{ height: '70px' }}>
        <Link passHref href="/">
          <Image src={SymphoMeet} alt="Logo" width={290} height={150} className="navbar-brand" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto d-flex justify-content-evenly">
            <li className="nav-item">
              <Link passHref href="/musicians">
                <a className="nav-link">
                  Musicians
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/ads">
                <a className="nav-link">
                  Ads
                </a>
              </Link>
            </li>
            <SearchBar />
            <li className="nav-item">
              <Link passHref href="/profile">
                <a className="nav-link">
                  Profile
                </a>
              </Link>
            </li>
            <button type="button" className="btn" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
