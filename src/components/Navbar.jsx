import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, User, LogOut, ShieldCheck, MapPin, Menu, X, Phone, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers } from '../data/mockUsers';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Close menu on scroll logic
  useEffect(() => {
    if (!isMenuOpen) return;

    const initialScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - initialScrollY);
      
      // Close menu only if user scrolls significantly (more than 100px) from where they opened it
      if (scrollDiff > 100) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Close menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = mockUsers.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'user') return '/dashboard/user';
    if (user.role === 'verifier') return '/dashboard/verifier';
    if (user.role === 'company') return '/dashboard/company';
    return '/';
  };

  return (
    <header className="w-full z-50 sticky top-0 shadow-sm">
      {/* Gov Banner */}
      <div className="bg-[#F0F0F0] py-1 px-4 sm:px-12 lg:px-20 flex items-center justify-between text-[11px] text-gray-600">
        <div className="flex items-center">
          <img
            src="https://www.QuanVerification.gov.sg/assets/img/lionhead.png"
            alt="India Lion Head"
            className="h-3 mr-2"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span>A India Government Agency Website <button className="underline inline-flex items-center ml-1">How to identify <ChevronDown size={10} /></button></span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Phone size={10} className="text-gray-400" />
            <span className="font-medium tracking-wide text-gray-500">+91 11 2430 1000</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 transition-colors">
            <IndiaFlag />
            <span className="font-bold tracking-widest text-[10px] uppercase">India</span>
            <ChevronDown size={10} />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex justify-between h-[72px] items-center gap-8">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 text-[24px] font-black text-quanverification-brand tracking-tighter shrink-0">
                <img src="/assets/logo/QuanVerifi.jpg" alt="Logo" className="h-10 w-auto rounded-md" />
                <span>QuanVerification</span>
              </Link>
            </div>

            {/* Centered Search Option */}
            <div className="flex-1 max-w-2xl relative" ref={searchRef}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-quanverification-brand transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search for verified users (e.g. Anish, Software Engineer)..."
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-quanverification-brand/10 focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                />
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-[100]">
                  {searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="px-4 py-2 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                        Verified Professionals ({searchResults.length})
                      </div>
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            navigate(`/profile/${result.id}`);
                          }}
                        >
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-quanverification-brand flex items-center justify-center shrink-0 border border-gray-100 text-white font-bold">
                          {result.name.charAt(0)}
                        </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-gray-900">{result.name}</span>
                              {result.verified && <ShieldCheck size={14} className="text-quanverification-brand" />}
                            </div>
                            <div className="text-[12px] text-gray-500 font-medium">{result.role}</div>
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                              <MapPin size={10} /> {result.location}
                            </div>
                          </div>
                          <div className="text-quanverification-brand text-[12px] font-bold">View Profile</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center">
                      <div className="text-gray-400 mb-2">No verified users found for "{searchQuery}"</div>
                      <div className="text-[12px] text-gray-400">Try searching for different names or roles.</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              {!isLoginPage && !user && (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-[14px] font-bold text-quanverification-brand border border-quanverification-brand rounded hover:bg-quanverification-light-brand transition-all"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 text-[14px] font-bold text-white bg-quanverification-brand rounded hover:bg-quanverification-dark-brand transition-all"
                  >
                    Register
                  </Link>
                </>
              )}

              {user && (
                <div className="flex items-center space-x-6">
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center space-x-3 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-quanverification-brand flex items-center justify-center text-white text-xs font-bold group-hover:scale-105 transition-transform">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm font-bold text-red-600 hover:text-red-700"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {/* Hamburger Icon with Text */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 ml-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                <span className="text-[13px] font-bold uppercase tracking-wider">
                  {isMenuOpen ? 'Close' : 'More'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Animated Secondary Navbar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-gray-50 border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-4">
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                  <MenuLink to="/services" label="Services" active={location.pathname === '/services'} />
                  <MenuLink to="/careers" label="Careers" active={location.pathname === '/careers'} />
                  <MenuLink to="/about" label="About" active={location.pathname === '/about'} />
                  <MenuLink to="/support" label="Help & Support" active={location.pathname === '/support'} />
                  <MenuLink to="/contact" label="Contact" active={location.pathname === '/contact'} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const MenuLink = ({ to, label, active }) => (
  <Link 
    to={to} 
    className={`text-[15px] font-bold transition-colors py-2 px-1 border-b-2 ${
      active 
        ? 'text-quanverification-brand border-quanverification-brand' 
        : 'text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand'
    }`}
  >
    {label}
  </Link>
);

const IndiaFlag = () => (
  <svg width="14" height="10" viewBox="0 0 3 2" className="rounded-sm shadow-sm">
    <rect width="3" height="2" fill="#FF9933"/>
    <rect y="0.66" width="3" height="1.34" fill="#FFFFFF"/>
    <rect y="1.33" width="3" height="0.67" fill="#128807"/>
    <circle cx="1.5" cy="1" r="0.2" fill="none" stroke="#000080" strokeWidth="0.05"/>
    <circle cx="1.5" cy="1" r="0.05" fill="#000080"/>
  </svg>
);

export default Navbar;
