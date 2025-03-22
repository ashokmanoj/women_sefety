import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, Heart, Menu, X } from 'lucide-react';
import { RootState } from '../store/store';
import { clearUser, setUser } from '../store/slices/userSlice';
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      const userId = Cookies.get('user_id');
      userId ? dispatch(setUser(userId)) : navigate('/');
    }
  }, [user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('user_id');
    Cookies.remove('user_email');
    Cookies.remove('user_name');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    navigate('/');
  };

  return (
    <header className="glass-effect sticky top-0 z-50 w-full bg-white shadow-md border-b border-purple-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-2 rounded-lg">
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            SafeGuard
          </span>
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-8 w-8 text-gray-600" /> : <Menu className="h-8 w-8 text-gray-600" />}
        </button>

        {/* Side Menu for Mobile */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-semibold text-gray-700">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-8 w-8 text-gray-600" />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 p-4">
            <li><Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link></li>
            {user ? (
              <>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">Dashboard</Link></li>
                <li><Link to="/location" className="text-gray-600 hover:text-purple-600 transition-colors">Location</Link></li>
                <li><Link to="/period-details" className="text-gray-600 hover:text-purple-600 transition-colors">Period Details</Link></li>
                <li><Link to="/report" className="text-gray-600 hover:text-purple-600 transition-colors">Report</Link></li>
                <li><Link to="/contacts" className="text-gray-600 hover:text-purple-600 transition-colors">Phone Book</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">Login</Link></li>
                <li>
                  <Link to="/signup" className="button-gradient text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">Dashboard</Link>
              <Link to="/location" className="text-gray-600 hover:text-purple-600 transition-colors">Location</Link>
              <Link to="/period-details" className="text-gray-600 hover:text-purple-600 transition-colors">Period Details</Link>
              <Link to="/report" className="text-gray-600 hover:text-purple-600 transition-colors">Report</Link>
              <Link to="/contacts" className="text-gray-600 hover:text-purple-600 transition-colors">Phone Book</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">Login</Link>
              <Link to="/signup" className="button-gradient text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">Sign Up</Link>
            </>
          )}
        </nav>

        {user && (
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <span className="text-pink-600">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}