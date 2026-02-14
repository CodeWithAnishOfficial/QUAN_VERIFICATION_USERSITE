import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, X, Search, LayoutDashboard, 
  LogOut, Bell, ChevronRight, MoreHorizontal, 
  Grid, Clock, ChevronLeft, Briefcase, GraduationCap, ShieldCheck,
  History, FileText, Settings, Zap
} from 'lucide-react';

const VerifyUser = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user || user.role !== 'verifier') {
      navigate('/login');
    }
  }, [user, navigate]);

  const [requests, setRequests] = useState([
    { id: 1, name: 'Alice Tan', type: 'Education', status: 'pending', progress: 60, time: '2 Days' },
    { id: 2, name: 'Bob Lim', type: 'Employment', status: 'pending', progress: 100, time: '3 Hours' },
    { id: 3, name: 'Charlie Wee', type: 'Education', status: 'pending', progress: 100, time: '5 Hours' },
    { id: 4, name: 'David Goh', type: 'Education', status: 'pending', progress: 75, time: '4 Days' },
    { id: 5, name: 'Eve Low', type: 'Employment', status: 'pending', progress: 0, time: '5 Days' },
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  if (!user || user.role !== 'verifier') return null;

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
            onClick={() => navigate('/dashboard/verifier')}
            className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all text-gray-400 hover:bg-quanverification-light-brand hover:text-quanverification-brand"
          >
            <Grid size={22} />
            <span className="text-sm">Dashboard</span>
          </button>
          
          <button 
            className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all bg-quanverification-brand text-white shadow-lg shadow-quanverification-brand/10"
          >
            <LayoutDashboard size={22} />
            <span className="text-sm">Verify user</span>
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
        <header className="h-24 bg-white flex items-center justify-between px-10 border-b border-gray-50 shrink-0">
          <div className="relative w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search Verification" 
              className="w-full pl-12 pr-6 py-3.5 bg-[#f5f6f7] border-none rounded-2xl focus:ring-2 focus:ring-quanverification-brand/20 text-sm font-medium transition-all"
            />
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
            </div>
          </div>
        </header>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto bg-[#fafbfc]">
          <div className="p-10 flex gap-8 max-w-[1600px] mx-auto">
            {/* Left Content Area */}
            <div className="flex-1 space-y-12">
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
                  <button className="text-xs font-black text-quanverification-brand uppercase tracking-widest hover:underline">View All</button>
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
                        <button className="px-6 py-2 bg-white text-gray-900 text-xs font-black rounded-xl hover:bg-gray-100 transition-colors">Process Now</button>
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
                      <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 text-xs font-black rounded-xl hover:bg-gray-50 transition-colors">Open Case</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
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

                <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
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
                              <div className="w-8 h-8 rounded-full bg-quanverification-brand flex items-center justify-center text-[10px] font-black text-white shadow-sm border-2 border-white/20">
                                {request.name.charAt(0).toUpperCase()}
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
                            <span className={`px-4 py-1.5 text-[10px] font-black rounded-full shadow-sm ${
                              request.status === 'verified' 
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
                              <button onClick={() => handleAction(request.id, 'verified')} className="p-2.5 bg-gray-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm"><Check size={18} /></button>
                              <button onClick={() => handleAction(request.id, 'rejected')} className="p-2.5 bg-gray-50 text-quanverification-brand hover:bg-quanverification-brand hover:text-white rounded-xl transition-all shadow-sm"><X size={18} /></button>
                              <button className="p-2.5 text-gray-300 hover:text-gray-600 transition-colors"><MoreHorizontal size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-6 py-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                  <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Showing 1-5 of 10 Results</p>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-300 hover:text-quanverification-brand"><ChevronLeft size={16} /></button>
                    <button className="w-9 h-9 rounded-xl bg-quanverification-brand text-white text-[11px] font-black shadow-lg shadow-quanverification-brand/10">1</button>
                    <button className="w-9 h-9 rounded-xl hover:bg-gray-50 text-[11px] font-bold text-gray-400 transition-all">2</button>
                    <button className="p-2 text-gray-300 hover:text-quanverification-brand"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky Sidebar - Right */}
            <aside className="w-80 space-y-8 shrink-0 relative">
              <div className="sticky top-0 space-y-8">
                {/* Calendar Section */}
                <div className="bg-white rounded-[32px] border border-gray-50 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <ChevronLeft size={16} className="text-gray-300 cursor-pointer hover:text-quanverification-brand" />
                    <h4 className="font-bold text-sm">February 2026</h4>
                    <ChevronRight size={16} className="text-gray-300 cursor-pointer hover:text-quanverification-brand" />
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                      <span key={d} className="text-[10px] font-black text-gray-300 mb-2 uppercase tracking-tighter">{d}</span>
                    ))}
                    {[8, 9, 10, 11, 12, 13, 14].map(d => (
                      <div key={d} className={`py-3 rounded-2xl flex items-center justify-center transition-all ${d === 14 ? 'bg-quanverification-brand text-white shadow-xl shadow-quanverification-brand/20' : 'text-gray-900 font-bold hover:bg-gray-50 cursor-pointer'}`}>
                        <span className="text-xs">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Focus Section */}
                <div className="bg-white rounded-[32px] border border-gray-50 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-sm">Verification Status</h4>
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Pending Review</p>
                      <p className="text-2xl font-black text-gray-900 mt-1">12</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                      <p className="text-[10px] font-black text-green-600 uppercase">Successfully Verified</p>
                      <p className="text-2xl font-black text-gray-900 mt-1">84</p>
                    </div>
                    <div className="p-4 bg-quanverification-light-brand rounded-2xl border border-quanverification-brand/10">
                      <p className="text-[10px] font-black text-quanverification-brand uppercase">Rejected Requests</p>
                      <p className="text-2xl font-black text-gray-900 mt-1">05</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Log */}
                <div className="bg-white rounded-[32px] border border-gray-50 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-sm">Recent Activity</h4>
                    <History size={16} className="text-gray-400" />
                  </div>
                  <div className="space-y-6">
                    {[
                      { user: 'Alice Tan', action: 'Verified Education', time: '10m ago', icon: <GraduationCap size={14} className="text-blue-500" /> },
                      { user: 'Bob Lim', action: 'Requested Review', time: '1h ago', icon: <FileText size={14} className="text-orange-500" /> },
                      { user: 'Charlie Wee', action: 'Rejected Employment', time: '3h ago', icon: <X size={14} className="text-quanverification-brand" /> },
                    ].map((activity, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{activity.user}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{activity.action}</p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-300 whitespace-nowrap">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verifier Tools */}
                <div className="bg-[#1a1c22] rounded-[32px] p-6 text-white shadow-xl shadow-gray-200">
                  <h4 className="font-bold text-sm mb-6">Verifier Tools</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700 hover:bg-quanverification-brand transition-all flex flex-col items-center gap-2 group">
                      <Zap size={20} className="text-quanverification-brand group-hover:text-white" />
                      <span className="text-[10px] font-black uppercase">Auto Scan</span>
                    </button>
                    <button className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700 hover:bg-quanverification-brand transition-all flex flex-col items-center gap-2 group">
                      <FileText size={20} className="text-blue-400 group-hover:text-white" />
                      <span className="text-[10px] font-black uppercase">Reports</span>
                    </button>
                    <button className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700 hover:bg-quanverification-brand transition-all flex flex-col items-center gap-2 group">
                      <Settings size={20} className="text-gray-400 group-hover:text-white" />
                      <span className="text-[10px] font-black uppercase">Settings</span>
                    </button>
                    <button className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700 hover:bg-quanverification-brand transition-all flex flex-col items-center gap-2 group">
                      <ShieldCheck size={20} className="text-green-400 group-hover:text-white" />
                      <span className="text-[10px] font-black uppercase">Policy</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
