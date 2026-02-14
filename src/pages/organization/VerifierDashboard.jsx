import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { mockUsers } from '../../data/mockUsers';
import {
  Check, X, Search, LayoutDashboard,
  LogOut, Bell, ChevronRight, MoreHorizontal,
  Grid, Clock, Star, ChevronLeft, Upload, History, User,
  Briefcase, GraduationCap, ShieldCheck, Mail, Phone, MapPin, Camera, FileText, Zap, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VerifierDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user || user.role !== 'verifier') {
      navigate('/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');
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
  const [requests, setRequests] = useState([
    { id: 1, name: 'Anish Kumar', type: 'Education', status: 'pending', progress: 60, time: '2 Days' },
    { id: 2, name: 'Priya Sharma', type: 'Employment', status: 'pending', progress: 100, time: '3 Hours' },
    { id: 3, name: 'Rahul Verma', role: 'Product Manager', status: 'pending', progress: 100, time: '5 Hours' },
    { id: 4, name: 'Sneha Reddy', type: 'Education', status: 'pending', progress: 75, time: '4 Days' },
    { id: 5, name: 'Vikram Singh', type: 'Employment', status: 'pending', progress: 0, time: '5 Days' },
  ]);

  const dashboardRef = useRef(null);
  const verifyRef = useRef(null);

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  // Tab Components
  const UploadSection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-quanverification-light-brand text-quanverification-brand rounded-[24px] flex items-center justify-center mx-auto shadow-lg shadow-quanverification-brand/10">
            <Upload size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Bulk Verification Upload</h2>
          <p className="text-gray-400 font-medium text-sm">Upload CSV or Excel files to process multiple verification requests simultaneously. Max file size: 50MB.</p>

          <div className="mt-10 border-2 border-dashed border-gray-200 rounded-[32px] p-12 hover:border-quanverification-brand/30 transition-colors cursor-pointer group bg-gray-50/30">
            <div className="space-y-4">
              <div className="flex justify-center -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm text-gray-400">
                    <FileText size={18} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">CSV, XLSX, or PDF (Verification Lists)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 text-left">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Upload Template</p>
              <button className="text-xs font-bold text-quanverification-brand hover:underline flex items-center gap-2">
                Download CSV Template <ChevronRight size={14} />
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Previous Uploads</p>
              <button className="text-xs font-bold text-quanverification-brand hover:underline flex items-center gap-2">
                View 12 past uploads <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HistorySection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Verification History</h1>
          <p className="text-gray-400 font-medium mt-1">Review all completed verification records.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold shadow-sm hover:bg-gray-50">Filter</button>
          <button className="px-6 py-2.5 bg-quanverification-brand text-white rounded-2xl text-xs font-bold shadow-lg shadow-quanverification-brand/10">Export Records</button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/20">
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">User</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Type</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Status</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Completed Date</th>
              <th className="px-8 py-6 text-right text-[11px] font-black text-gray-400 uppercase tracking-[2px]">ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: 'Michael Chen', type: 'Education', status: 'verified', date: 'Feb 12, 2026', id: 'QV-9821' },
              { name: 'Elena Rodriguez', type: 'Employment', status: 'verified', date: 'Feb 10, 2026', id: 'QV-9755' },
              { name: 'Marcus Thorne', type: 'Identity', status: 'rejected', date: 'Feb 09, 2026', id: 'QV-9742' },
              { name: 'Sarah Wilson', type: 'Education', status: 'verified', date: 'Feb 08, 2026', id: 'QV-9701' },
              { name: 'Kevin Park', type: 'Employment', status: 'verified', date: 'Feb 05, 2026', id: 'QV-9644' },
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
                <td className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">{record.type}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 text-[10px] font-black rounded-full ${record.status === 'verified' ? 'bg-green-50 text-green-600' : 'bg-quanverification-light-brand text-quanverification-brand'}`}>
                    {record.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] font-bold text-gray-400">{record.date}</td>
                <td className="px-8 py-6 text-right text-[11px] font-black text-quanverification-brand">{record.id}</td>
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
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-full h-full object-cover rounded-[36px]" alt="" />
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-quanverification-brand text-white rounded-xl flex items-center justify-center shadow-lg"><Camera size={14} /></button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900">{user.name}</h2>
            <p className="text-gray-400 font-bold uppercase tracking-[3px] text-xs mt-1">Official Verifier • ID: {user.email}</p>
          </div>
          <button className="px-8 py-3 bg-quanverification-brand text-white rounded-2xl font-bold text-sm shadow-xl shadow-quanverification-brand/20">Edit Profile</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Mail size={16} className="text-quanverification-brand" /> {user.email}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Phone size={16} className="text-quanverification-brand" /> +65 6712 3456
                </div>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Briefcase size={16} className="text-quanverification-brand" /> Academic Records Verification Unit
                </div>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <MapPin size={16} className="text-quanverification-brand" /> 12 Science Park Dr, India 118225
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#1a1c22] rounded-[32px] p-8 text-white">
            <h3 className="text-lg font-bold mb-6">Security Stats</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-400">Trust Score</span>
                <span className="text-xl font-black text-quanverification-brand">99.8%</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-quanverification-brand h-full" style={{ width: '99.8%' }}></div>
              </div>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-bold">2FA Enabled</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold">Encrypted Storage Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VerifySection = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">User Verification</h1>
          <p className="text-gray-400 font-medium mt-1">Review and manage pending identity verification requests.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search requests..."
            className="pl-10 pr-4 py-2 text-[11px] bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-quanverification-brand/10 w-56 font-bold shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/20">
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">User</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Category</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Progress</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Status</th>
              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Request Date</th>
              <th className="px-8 py-6 text-right text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-quanverification-brand flex items-center justify-center text-white text-[10px] font-bold">
                      {request.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{request.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-black text-quanverification-brand bg-quanverification-light-brand px-3 py-1 rounded-lg uppercase tracking-wider">{request.type}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-black text-gray-400 w-10">{request.progress}%</span>
                    <div className="flex-1 min-w-[120px] bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-quanverification-brand h-full rounded-full transition-all duration-700" style={{ width: `${request.progress}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 text-[10px] font-black rounded-full shadow-sm ${request.status === 'verified'
                      ? 'bg-green-50 text-green-600'
                      : request.status === 'rejected' ? 'bg-quanverification-light-brand text-quanverification-brand' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] font-bold text-gray-400">
                  {request.time}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={() => handleAction(request.id, 'verified')} className="p-2.5 bg-gray-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all"><Check size={18} /></button>
                    <button onClick={() => handleAction(request.id, 'rejected')} className="p-2.5 bg-gray-50 text-quanverification-brand hover:bg-quanverification-brand hover:text-white rounded-xl transition-all"><X size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10' : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'}`}
          >
            <Grid size={22} />
            <span className="text-sm">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('verify')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'verify' ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10' : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'}`}
          >
            <LayoutDashboard size={22} />
            <span className="text-sm">Verify user</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'upload' ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10' : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'}`}
          >
            <Upload size={22} />
            <span className="text-sm">Bulk Upload</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'history' ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10' : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'}`}
          >
            <History size={22} />
            <span className="text-sm">History</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10' : 'text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand'}`}
          >
            <User size={22} />
            <span className="text-sm">Profile</span>
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
                placeholder="Search Verification"
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
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Organization Verifier</p>
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
                    {/* Quick Stats Modules */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                          <GraduationCap size={28} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Education</p>
                          <p className="text-2xl font-black text-gray-900">1,284</p>
                          <p className="text-[10px] font-bold text-green-500 mt-1">+12% from last week</p>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
                        <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                          <Briefcase size={28} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Employment</p>
                          <p className="text-2xl font-black text-gray-900">856</p>
                          <p className="text-[10px] font-bold text-green-500 mt-1">+5% from last month</p>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
                        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                          <ShieldCheck size={28} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Identity</p>
                          <p className="text-2xl font-black text-gray-900">3,420</p>
                          <p className="text-[10px] font-bold text-green-500 mt-1">+18% from last week</p>
                        </div>
                      </div>
                    </div>

                    {/* Priority Section */}
                    <section className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Priority Verification</h3>
                        <button onClick={() => setActiveTab('verify')} className="text-xs font-black text-quanverification-brand uppercase tracking-widest hover:underline">View All</button>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[#1a1c22] rounded-[32px] p-6 text-white shadow-xl shadow-gray-200 group overflow-hidden relative">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock size={80} />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-2 py-1 bg-quanverification-brand text-[10px] font-black rounded uppercase">Urgent</span>
                              <span className="text-[10px] font-bold text-gray-400">Due in 2 hours</span>
                            </div>
                            <h4 className="text-lg font-bold mb-1">Verify Employment: Johnathan Wick</h4>
                            <p className="text-xs text-gray-400 mb-6">Background check for Senior Architect position at Tech Global.</p>
                            <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1c22] bg-quanverification-brand flex items-center justify-center text-[10px] font-bold text-white">
                                    {String.fromCharCode(64 + i)}
                                  </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-[#1a1c22] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white">+3</div>
                              </div>
                              <button onClick={() => setActiveTab('verify')} className="px-6 py-2 bg-white text-gray-900 text-xs font-black rounded-xl hover:bg-gray-100 transition-colors">Process Now</button>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-[32px] border border-gray-50 p-6 shadow-sm group hover:border-quanverification-brand/20 transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-[10px] font-black rounded uppercase">Review Needed</span>
                            <span className="text-[10px] font-bold text-gray-400">High Confidence: 92%</span>
                          </div>
                          <h4 className="text-lg font-bold mb-1">Identity Verification: Sarah Connor</h4>
                          <p className="text-xs text-gray-400 mb-6">AI flagged slight mismatch in document photo. Manual review required.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-quanverification-brand">
                                <ShieldCheck size={18} />
                              </div>
                              <span className="text-[10px] font-black text-gray-400 uppercase">Documents Attached</span>
                            </div>
                            <button onClick={() => setActiveTab('verify')} className="px-6 py-2 border-2 border-gray-900 text-gray-900 text-xs font-black rounded-xl hover:bg-gray-50 transition-colors">Open Case</button>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Recent Requests Table */}
                    <section ref={verifyRef} className="space-y-6">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold">Recent Verification Requests</h3>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            placeholder="Search requests..."
                            className="pl-10 pr-4 py-2 text-[11px] bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-quanverification-brand/10 w-56 font-bold shadow-sm"
                          />
                        </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/20">
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">User</th>
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Status</th>
                              <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Progress</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {requests.slice(0, 3).map((request) => (
                              <tr key={request.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6">
                                  <span className="text-sm font-bold text-gray-900">{request.name}</span>
                                  <p className="text-[10px] text-gray-400 font-black mt-0.5 uppercase tracking-widest">{request.type}</p>
                                </td>
                                <td className="px-8 py-6">
                                  <span className={`px-4 py-1.5 text-[10px] font-black rounded-full shadow-sm ${request.status === 'verified'
                                      ? 'bg-green-50 text-green-600'
                                      : request.status === 'rejected' ? 'bg-quanverification-light-brand text-quanverification-brand' : 'bg-yellow-50 text-yellow-600'
                                    }`}>
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                    <span className="text-[11px] font-black text-gray-400 w-10">{request.progress}%</span>
                                    <div className="flex-1 min-w-[120px] bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                      <div className="bg-quanverification-brand h-full rounded-full transition-all duration-700" style={{ width: `${request.progress}%` }}></div>
                                    </div>
                                  </div>
                                </td>
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
                    {/* Activity Section */}
                    <div className="bg-white rounded-[32px] border border-gray-50 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-8">
                        <h4 className="font-bold text-sm">Verification Activity</h4>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl cursor-pointer">
                          <span className="text-[10px] font-black text-gray-400 uppercase">This Week</span>
                          <ChevronRight size={14} className="rotate-90 text-gray-400" />
                        </div>
                      </div>
                      <div className="h-44 flex items-end justify-between px-4">
                        {[1, 2, 3, 2.5, 3.5, 2.5, 3].map((val, i) => (
                          <div key={i} className="flex flex-col items-center gap-3 group">
                            <div className="w-2 bg-gray-50 rounded-full h-32 relative overflow-hidden">
                              <div className="absolute bottom-0 left-0 right-0 bg-quanverification-brand transition-all duration-700 rounded-full group-hover:bg-quanverification-dark-brand" style={{ height: `${val * 25}%` }}></div>
                            </div>
                            <span className="text-[10px] font-black text-gray-300">{'SMTWTFS'[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats Section */}
                    <div className="bg-[#1a1c22] rounded-[32px] p-8 text-white shadow-2xl">
                      <h4 className="font-bold text-sm mb-6">Verification Load</h4>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-gray-400">Current Capacity</span>
                          <span className="text-xl font-black text-quanverification-brand">72%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-quanverification-brand h-full" style={{ width: '72%' }}></div>
                        </div>
                        <div className="pt-4 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs font-bold">128 Pending Requests</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs font-bold">45 Completed Today</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            ) : activeTab === 'verify' ? (
              <VerifySection />
            ) : activeTab === 'upload' ? (
              <UploadSection />
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

export default VerifierDashboard;
