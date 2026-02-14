import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { mockUsers } from '../../data/mockUsers';
import {
  Check, X, Search, LayoutDashboard,
  LogOut, Bell, ChevronRight, MoreHorizontal,
  Grid, Clock, Star, ChevronLeft, MapPin, GraduationCap, ShieldCheck,
  Upload, History, User, Briefcase, Mail, Phone, Camera, FileText, Zap, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user || user.role !== 'company') {
      navigate('/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [recruitmentHistory] = useState([
    { id: 1, name: 'Anish Kumar', role: 'Full Stack Developer', status: 'Hired', date: 'Feb 14, 2026' },
    { id: 2, name: 'Priya Sharma', role: 'Data Scientist', status: 'Interviewing', date: 'Feb 12, 2026' },
    { id: 3, name: 'Rahul Verma', role: 'Product Manager', status: 'Screening', date: 'Feb 10, 2026' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);

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

  const dashboardRef = useRef(null);
  const discoveryRef = useRef(null);

  if (!user || user.role !== 'company') return null;

  const talents = [
    { id: 1, name: 'John Doe', role: 'Full Stack Developer', location: 'India', education: 'B.S. CS, NUS', verified: true, progress: 100, rating: 4.8 },
    { id: 2, name: 'Jane Smith', role: 'Data Scientist', location: 'Remote', education: 'M.S. Data, Stanford', verified: true, progress: 95, rating: 4.9 },
    { id: 3, name: 'Michael Chen', role: 'UX Designer', location: 'India', education: 'B.Des, NTU', verified: true, progress: 85, rating: 4.7 },
    { id: 4, name: 'Sarah Wilson', role: 'Product Manager', location: 'London', education: 'MBA, INSEAD', verified: true, progress: 90, rating: 4.6 },
    { id: 5, name: 'David Goh', role: 'Backend Engineer', location: 'India', education: 'B.S. CS, NTU', verified: true, progress: 80, rating: 4.5 },
  ];

  // Tab Components
  const DiscoverySection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Talent Discovery</h1>
          <p className="text-gray-400 font-medium mt-1">Search and connect with verified professionals.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search verified talent..."
            className="pl-10 pr-4 py-2 text-[11px] bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-quanverification-brand/10 w-64 font-bold shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/20">
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Professional</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Education</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Location</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Verification</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Rating</th>
              <th className="px-8 py-6 text-right text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {talents.map((talent) => (
              <tr key={talent.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-quanverification-brand flex items-center justify-center text-white text-[10px] font-bold">
                      {talent.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{talent.name}</span>
                      <span className="text-[10px] text-gray-400 font-bold">{talent.role}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-xs font-bold text-gray-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-quanverification-brand" />
                    {talent.education}
                  </div>
                </td>
                <td className="px-8 py-6 text-xs font-bold text-gray-400">{talent.location}</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-1.5 text-[10px] font-black rounded-full shadow-sm bg-green-50 text-green-600 uppercase">Verified</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <Star size={14} className="text-orange-400 fill-orange-400" />
                    {talent.rating}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="px-4 py-2 bg-quanverification-brand text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-quanverification-dark-brand transition-all">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PostJobSection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-quanverification-light-brand text-quanverification-brand rounded-[24px] flex items-center justify-center mx-auto shadow-lg shadow-quanverification-brand/10">
            <Upload size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Post New Requirement</h2>
          <p className="text-gray-400 font-medium text-sm">Create a new job posting or upload a batch of requirements to find verified talent.</p>
          
          <div className="mt-10 border-2 border-dashed border-gray-200 rounded-[32px] p-12 hover:border-quanverification-brand/30 transition-colors cursor-pointer group bg-gray-50/30">
            <div className="space-y-4">
              <div className="flex justify-center -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm text-gray-400">
                    <Briefcase size={18} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Click to upload JD or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOCX, or XLSX (Requirement Lists)</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button className="px-10 py-4 bg-quanverification-brand text-white rounded-2xl font-black text-sm shadow-xl shadow-quanverification-brand/20 hover:-translate-y-1 transition-all active:translate-y-0">
              Create Single Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const HistorySection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Recruitment History</h1>
          <p className="text-gray-400 font-medium mt-1">Track your past hiring activities and candidate interactions.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/20">
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Candidate</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Position</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Status</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Applied Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: 'Alex Johnson', role: 'Full Stack Dev', status: 'interviewed', date: 'Feb 14, 2026' },
              { name: 'Maria Garcia', role: 'UI Designer', status: 'hired', date: 'Feb 10, 2026' },
              { name: 'James Wilson', role: 'Backend Eng', status: 'rejected', date: 'Feb 08, 2026' },
            ].map((record, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-quanverification-brand flex items-center justify-center text-white text-[10px] font-bold">
                      {record.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{record.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">{record.role}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 text-[10px] font-black rounded-full ${
                    record.status === 'hired' ? 'bg-green-50 text-green-600' : 
                    record.status === 'interviewed' ? 'bg-blue-50 text-blue-600' : 'bg-quanverification-light-brand text-quanverification-brand'
                  }`}>
                    {record.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] font-bold text-gray-400">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ProfileSection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-quanverification-brand/5"></div>
        <div className="relative pt-12 flex flex-col md:flex-row items-center md:items-end gap-8 px-6">
          <div className="w-32 h-32 rounded-[40px] bg-white p-1 shadow-xl relative">
            <img src="https://images.unsplash.com/photo-1549157512-456a07d49248?auto=format&fit=crop&w=256&q=80" className="w-full h-full object-cover rounded-[36px]" alt="" />
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-quanverification-brand text-white rounded-xl flex items-center justify-center shadow-lg"><Camera size={14} /></button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900">{user.name}</h2>
            <p className="text-gray-400 font-bold uppercase tracking-[3px] text-xs mt-1">Verified Hiring Partner • ID: {user.email}</p>
          </div>
          <button className="px-8 py-3 bg-quanverification-brand text-white rounded-2xl font-bold text-sm shadow-xl shadow-quanverification-brand/20">Edit Company</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black mb-6">Company Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Email</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Mail size={16} className="text-quanverification-brand" /> {user.email}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Phone size={16} className="text-quanverification-brand" /> +91 80 4123 4567
                </div>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Briefcase size={16} className="text-quanverification-brand" /> Information Technology & Services
                </div>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HQ Location</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <MapPin size={16} className="text-quanverification-brand" /> Outer Ring Rd, Bangalore, India
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-[#1a1c22] rounded-[32px] p-8 text-white">
            <h3 className="text-lg font-bold mb-6">Recruitment Stats</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-400">Pipeline Strength</span>
                <span className="text-xl font-black text-quanverification-brand">84%</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-quanverification-brand h-full" style={{ width: '84%' }}></div>
              </div>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-bold">12 Active Positions</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold">Verified Only Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#fafbfc] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar - Left */}
      <aside className="w-64 border-r border-gray-100 flex flex-col bg-white shrink-0">
        <div className="p-6 flex items-center gap-3">
          <img src="/assets/logo/QuanVerifi.jpg" alt="Logo" className="h-10 w-auto rounded-md" />
          <span className="text-xl font-black text-quanverification-brand tracking-tighter">QuanVerification</span>
        </div>
        <nav className="flex-1 px-6 space-y-2 mt-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'dashboard'
              ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10'
              : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'
              }`}
          >
            <Grid size={22} />
            <span className="text-sm">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('discovery')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'discovery'
              ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10'
              : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'
              }`}
          >
            <Search size={22} />
            <span className="text-sm">Talent Discovery</span>
          </button>

          <button
            onClick={() => setActiveTab('postjob')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'postjob'
              ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10'
              : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'
              }`}
          >
            <Upload size={22} />
            <span className="text-sm">Post New Job</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'history'
              ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10'
              : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'
              }`}
          >
            <History size={22} />
            <span className="text-sm">Hiring History</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile'
              ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10'
              : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'
              }`}
          >
            <User size={22} />
            <span className="text-sm">Company Profile</span>
          </button>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/');
            }}
            className="w-full flex items-center space-x-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-all group"
          >
            <LogOut size={22} className="group-hover:translate-x-1 transition-transform text-red-600" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-50 shrink-0 sticky top-0 z-40">
          <div className="h-24 flex items-center justify-between px-10">
            <div className="relative w-1/3" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search talent, skills or roles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                className="w-full pl-12 pr-6 py-3.5 bg-[#f5f6f7] border-none rounded-2xl focus:ring-2 focus:ring-quanverification-brand/20 text-sm font-medium transition-all"
              />
              {/* Search Results Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-[100]">
                  {searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto">
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
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                            <img src={result.avatar} alt={result.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-gray-900">{result.name}</span>
                              {result.verified && <ShieldCheck size={14} className="text-quanverification-brand" />}
                            </div>
                            <div className="text-[12px] text-gray-500 font-medium">{result.role}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-4 text-center text-sm text-gray-400">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 border-l border-gray-100 pl-6">
                <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors relative">
                  <Bell size={24} />
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-quanverification-brand rounded-full border-2 border-white"></span>
                </button>
              </div>

              <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">{user.name}</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Premium Partner</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md shadow-quanverification-brand/10 border-2 border-quanverification-brand/10">
                  <span className="text-xl font-black text-quanverification-brand">{user.name.charAt(0)}</span>
                </div>

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

          {/* Secondary Navigation Menu */}
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
                    <Link to="/" className="text-[15px] font-bold transition-colors py-2 px-1 border-b-2 text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand">Home</Link>
                    <Link to="/services" className="text-[15px] font-bold transition-colors py-2 px-1 border-b-2 text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand">Services</Link>
                    <Link to="/careers" className="text-[15px] font-bold transition-colors py-2 px-1 border-b-2 text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand">Careers</Link>
                    <Link to="/about" className="text-[15px] font-bold transition-colors py-2 px-1 border-b-2 text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand">About</Link>
                    <Link to="/support" className="text-[15px] font-bold transition-colors py-2 px-1 border-b-2 text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand">Help & Support</Link>
                    <Link to="/contact" className="text-[15px] font-bold transition-colors py-2 px-1 border-b-2 text-gray-700 border-transparent hover:text-quanverification-brand hover:border-quanverification-brand">Contact</Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Combined Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto bg-[#fafbfc] scroll-smooth">
          <div className="p-10 max-w-[1600px] mx-auto">
            {activeTab === 'dashboard' ? (
              <div className="flex gap-8">
                {/* Left Content Area */}
                <div className="flex-1 space-y-12">
                  <div ref={dashboardRef} className="space-y-12">
                    {/* Row 1: Hiring Stats & Activity */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {/* Active Positions Card */}
                      <div className="bg-[#1a1c22] rounded-[32px] p-8 text-white flex flex-col justify-between shadow-2xl shadow-gray-200">
                        <h3 className="text-xl font-bold">Talent Pipeline</h3>
                        <div className="flex items-center justify-center py-6">
                          <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-700" />
                              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * 72) / 100} className="text-quanverification-brand transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black">72%</span>
                            </div>
                          </div>
                          <div className="ml-8 text-left">
                            <p className="text-4xl font-black">245</p>
                            <p className="text-gray-400 text-sm font-black uppercase tracking-widest">Applicants</p>
                          </div>
                        </div>
                      </div>

                      {/* Hiring Activity Chart */}
                      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="text-xl font-bold">Hiring Activity</h3>
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl cursor-pointer">
                            <span className="text-[10px] font-black text-gray-400 uppercase">This Month</span>
                            <ChevronRight size={14} className="rotate-90 text-gray-400" />
                          </div>
                        </div>
                        <div className="h-44 flex items-end justify-between px-4">
                          {[2.5, 4, 3, 5, 4.5, 6, 5.5].map((val, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 group">
                              <div className="w-2 bg-gray-50 rounded-full h-32 relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 right-0 bg-quanverification-brand transition-all duration-700 rounded-full group-hover:bg-quanverification-dark-brand" style={{ height: `${val * 15}%` }}></div>
                              </div>
                              <span className="text-[10px] font-black text-gray-300">{'MTWTFSS'[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Featured Talent */}
                    <section className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Top Verified Talent</h3>
                        <div className="flex gap-2">
                          <button className="p-2 border border-gray-100 rounded-xl hover:bg-white shadow-sm"><ChevronLeft size={16} /></button>
                          <button className="p-2 border border-gray-100 rounded-xl hover:bg-white shadow-sm"><ChevronRight size={16} /></button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {talents.slice(0, 2).map((talent, i) => (
                          <div key={i} className="bg-white rounded-[32px] border border-gray-100 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-[20px] bg-quanverification-brand flex items-center justify-center text-white text-xl font-black shadow-inner">
                                {talent.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-base">{talent.name}</h4>
                                <p className="text-[11px] text-gray-400 font-black uppercase tracking-wider">{talent.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <button className="text-quanverification-brand font-black text-xs hover:text-quanverification-dark-brand transition-colors">View Profile</button>
                              <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-gray-400">
                                <ShieldCheck size={12} className="text-green-600" /> Verified
                                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                <Star size={12} className="text-orange-400 fill-orange-400" /> {talent.rating}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    {/* Recent Recruitment History */}
                    <section className="space-y-6">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold">Recent Recruitment History</h3>
                        <button onClick={() => setActiveTab('history')} className="text-xs font-black text-quanverification-brand uppercase tracking-widest hover:underline">View All</button>
                      </div>
                      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/20">
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Candidate</th>
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Role</th>
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Status</th>
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {recruitmentHistory.map((item) => (
                              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6">
                                  <span className="text-sm font-bold text-gray-900">{item.name}</span>
                                </td>
                                <td className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">{item.role}</td>
                                <td className="px-8 py-6">
                                  <span className={`px-4 py-1.5 text-[10px] font-black rounded-full shadow-sm ${
                                    item.status === 'Hired' 
                                      ? 'bg-green-50 text-green-600' 
                                      : item.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                  }`}>
                                    {item.status.toUpperCase()}
                                  </span>
                                </td>
                                <td className="px-8 py-6 text-[11px] font-bold text-gray-400">{item.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Sticky Sidebar - Right */}
                <aside className="w-80 space-y-8 shrink-0 relative">
                  <div className="sticky top-0 space-y-8">
                    {/* Recruitment Progress Section */}
                    <div className="bg-white rounded-[32px] border border-gray-50 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-sm">Active Jobs</h4>
                        <MoreHorizontal size={16} className="text-gray-400" />
                      </div>
                      <div className="w-full h-44 rounded-2xl bg-quanverification-light-brand mb-4 overflow-hidden shadow-inner flex items-center justify-center">
                        <Briefcase size={48} className="text-quanverification-brand opacity-20" />
                      </div>
                      <h4 className="font-bold text-sm mb-1">Senior Product Designer</h4>
                      <p className="text-[10px] text-gray-400 font-black mb-5 uppercase tracking-widest">Hiring • 12 Candidates</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase">
                          <span className="text-gray-400">Completion</span>
                          <span className="text-quanverification-brand">65%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-quanverification-brand h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Trending Skills Section */}
                    <div className="bg-[#1a1c22] rounded-[32px] p-8 text-white shadow-2xl">
                      <h4 className="font-bold text-sm mb-6">Trending Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Figma', 'Node.js', 'Python', 'AI/ML'].map(skill => (
                          <span key={skill} className="px-4 py-2 bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-700 hover:border-quanverification-brand transition-colors cursor-pointer">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <button className="w-full mt-8 py-4 bg-quanverification-brand text-white text-[10px] font-black rounded-2xl shadow-lg shadow-quanverification-brand/10 hover:bg-quanverification-dark-brand transition-all uppercase tracking-widest">
                        Post New Job
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            ) : activeTab === 'discovery' ? (
              <DiscoverySection />
            ) : activeTab === 'postjob' ? (
              <PostJobSection />
            ) : activeTab === 'history' ? (
              <HistorySection />
            ) : activeTab === 'profile' ? (
              <ProfileSection />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
