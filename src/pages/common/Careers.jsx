import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Filter, 
  ChevronRight, 
  Building2,
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNotification, setShowNotification] = useState(false);
  const [appliedJob, setAppliedJob] = useState(null);
  const navigate = useNavigate();

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleApply = (job) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate application process using user details
    setAppliedJob(job);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "New Delhi (Remote)",
      type: "Full-time",
      salary: "₹18L - ₹24L",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Mumbai",
      type: "Full-time",
      salary: "₹12L - ₹16L",
      posted: "5 days ago"
    },
    {
      id: 3,
      title: "Security Analyst",
      department: "Operations",
      location: "Bangalore",
      type: "Contract",
      salary: "₹10L - ₹14L",
      posted: "1 week ago"
    },
    {
      id: 4,
      title: "Backend Engineer (Node.js)",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "₹15L - ₹20L",
      posted: "3 days ago"
    },
    {
      id: 5,
      title: "HR Business Partner",
      department: "Human Resources",
      location: "New Delhi",
      type: "Full-time",
      salary: "₹8L - ₹12L",
      posted: "1 day ago"
    }
  ];

  const categories = ["All", "Engineering", "Design", "Operations", "Human Resources"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || job.department === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans selection:bg-quanverification-light-brand pb-20">
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-quanverification-light-brand p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-grow">
                <h4 className="font-black text-gray-900">Application Successful!</h4>
                <p className="text-sm text-gray-500">Your profile details for <strong>{user?.name}</strong> have been sent for <strong>{appliedJob?.title}</strong>.</p>
              </div>
              <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-quanverification-brand pt-24 pb-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Build the future of trust</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              Join a team of innovators dedicated to securing digital identities and verifying credentials for millions across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-5xl mx-auto px-6 -mt-24 relative z-20">
        <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-2xl border border-gray-100">
          <div className="flex flex-col gap-8">
            {/* Search Bar - Centered */}
            <div className="relative max-w-2xl mx-auto w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input 
                type="text" 
                placeholder="Search by job title or department..." 
                className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-quanverification-brand/5 focus:bg-white transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-2">
                <Filter size={14} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === cat 
                      ? 'bg-quanverification-brand text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-gray-900">
            Open Positions <span className="text-quanverification-brand ml-2">({filteredJobs.length})</span>
          </h2>
          <div className="h-px flex-grow bg-gray-200 mx-8"></div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-quanverification-light-brand text-quanverification-brand rounded-lg text-[11px] font-black uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[11px] font-black uppercase tracking-wider">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-quanverification-brand transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-6 text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin size={18} className="text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={18} className="text-gray-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-gray-400" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job);
                      }}
                      className="flex items-center gap-2 bg-gray-50 text-gray-900 px-6 py-4 rounded-xl font-bold hover:bg-quanverification-brand hover:text-white transition-all shrink-0"
                    >
                      Apply Now <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-gray-200"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                  className="mt-6 text-quanverification-brand font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 mt-32">
        <div className="bg-black rounded-[48px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10">
             <svg width="400" height="400" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
             </svg>
          </div>
          <div className="w-full md:w-1/2 space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Why join<br />QuanVerification?</h2>
            <p className="text-lg text-white/70 leading-relaxed font-medium">
              We offer more than just a job. We provide a platform for growth, innovation, and making a real-world impact on digital security.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-black text-2xl mb-1">Impact</h4>
                <p className="text-white/50 text-sm">Securing 4M+ users</p>
              </div>
              <div>
                <h4 className="text-white font-black text-2xl mb-1">Growth</h4>
                <p className="text-white/50 text-sm">Continuous learning</p>
              </div>
              <div>
                <h4 className="text-white font-black text-2xl mb-1">Culture</h4>
                <p className="text-white/50 text-sm">Inclusive & bold</p>
              </div>
              <div>
                <h4 className="text-white font-black text-2xl mb-1">Health</h4>
                <p className="text-white/50 text-sm">Premium coverage</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <img 
              src="/assets/images/herogirl.png" 
              alt="Team" 
              className="w-full rounded-[32px] shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
