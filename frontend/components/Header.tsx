"use client"; // Add this line

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store'; 
import { logout } from '@/features/authSlice';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('access_token'); 
    window.location.href = '/signin';
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between p-2">
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              src="/assets/icons/logo.webp"
              height={1000}
              width={1000}
              alt="logo"
              className="side-img max-w-[7%] h-8"
            />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href={`/invoice/${authState.access_token}/new-invoice`} className=' text-center p-2'>
            invoice
          </Link>
          {authState.isAuthenticated ? (
            <button  onClick={handleLogout} className="text-red-700 p-2">
              signout
            </button>
          ) : (
            <>
              <Link className=' p-2 ' href="/signin">
                signin
              </Link>
              <Link className=' p-2' href="/signup">
                signup
              </Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <nav className="flex flex-col items-center p-4 space-y-4">
            {authState.isAuthenticated ? (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            ) : (
              <>
            <Link href={`/invoice/${authState.access_token}/new-invoice`} className=' text-center p-2'>
            invoice
          </Link>
                <Link href="/signin">
                  Login
                </Link>
                <Link href="/signup">
                  Signup
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
