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
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('user_id');
    Cookies.remove('user_email');
    Cookies.remove('user_name');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-purple-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-2 rounded-lg">
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            SafeGuard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-purple-600">Dashboard</Link>
              <Link to="/location" className="text-gray-600 hover:text-purple-600">Location</Link>
              <Link to="/testlocation" className="text-gray-600 hover:text-purple-600">Test Location</Link>
              <Link to="/report" className="text-gray-600 hover:text-purple-600">Report</Link>
              <Link to="/contacts" className="text-gray-600 hover:text-purple-600">Phone Book</Link>
              <button onClick={handleLogout} className="text-pink-600 hover:text-red-600 flex items-center space-x-1">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
              <Link to="/signup" className="button-gradient text-white px-6 py-2 rounded-full">Sign Up</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-purple-600">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-gray-700" onClick={toggleMenu}>Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={toggleMenu} className="text-gray-700">Dashboard</Link>
                <Link to="/location" onClick={toggleMenu} className="text-gray-700">Location</Link>
                <Link to="/testlocation" onClick={toggleMenu} className="text-gray-700">Test Location</Link>
                <Link to="/report" onClick={toggleMenu} className="text-gray-700">Report</Link>
                <Link to="/contacts" onClick={toggleMenu} className="text-gray-700">Phone Book</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-pink-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="text-gray-700">Login</Link>
                <Link to="/signup" onClick={toggleMenu} className="text-purple-600 font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
