import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Briefcase, Clock, CheckCircle,
  Download, Trash2, Edit2,
  ShieldCheck, X, LogOut
} from 'lucide-react';

const EndUserDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Resume');
  const userStr = localStorage.getItem('user');
  const initialUser = userStr ? JSON.parse(userStr) : null;

  // Profile State
  const [profile, setProfile] = useState({
    name: initialUser?.name || 'John Doe',
    role: 'Senior Systems Architect',
    company: 'Global Tech Solutions',
    location: 'India',
    phone: '+65 9123 4567',
    email: initialUser?.email || 'user@gmail.com',
    salary: '120,000',
    noticePeriod: '2 Months',
    headline: 'Experienced Full Stack Developer with over 8 years of professional experience in building scalable web applications. Proficient in modern JavaScript frameworks and cloud technologies. Dedicated to creating high-quality, performant, and maintainable code...',
  });

  const [skills, setSkills] = useState(['JavaScript', 'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST API', 'GraphQL', 'Agile']);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);

  useEffect(() => {
    if (!initialUser || initialUser.role !== 'user') {
      navigate('/login');
    }
  }, [initialUser, navigate]);

  if (!initialUser || initialUser.role !== 'user') return null;

  const handleDownloadFullProfile = () => {
    window.print();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    // Update localStorage if name changed
    const updatedUser = { ...initialUser, name: profile.name };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleAddSkill = () => {
    const newSkill = prompt("Enter new skill:");
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  const handleDownloadResume = () => {
    // Mock download by creating a temporary link
    const link = document.createElement('a');
    link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    link.download = `RESUME_${profile.name.replace(/\s+/g, '_').toUpperCase()}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateResume = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploading ${file.name}... (Prototype)`);
    }
  };

  const quickLinks = [
    { name: 'Resume', action: 'Update' },
    { name: 'Resume headline', action: null },
    { name: 'Key skills', action: null },
    { name: 'Employment', action: 'Add' },
    { name: 'Education', action: 'Add' },
    { name: 'IT skills', action: 'Add' },
    { name: 'Projects', action: 'Add' },
    { name: 'Profile summary', action: null },
    { name: 'Accomplishments', action: null },
    { name: 'Career profile', action: null },
    { name: 'Personal details', action: null },
  ];

  const scrollToSection = (sectionName) => {
    setActiveSection(sectionName);
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-8 flex justify-end">
        <button 
          onClick={handleDownloadFullProfile}
          className="bg-quanverification-brand text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-quanverification-dark-brand transition-all shadow-lg no-print"
        >
          <Download size={20} /> Download Full Profile (PDF)
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-4">

        {/* Top Profile Card */}
        <div id="Personal details" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 scroll-mt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full flex items-center justify-center relative">
                {/* Background Track (The "Disabled" part) */}
                <div className="absolute inset-0 rounded-full border-[6px] border-gray-100"></div>

                {/* Photo Container */}
                <div className="w-[148px] h-[148px] rounded-full overflow-hidden bg-white border-4 border-white z-10 shadow-sm flex items-center justify-center">
                  <span className="text-6xl font-black text-quanverification-brand">{profile.name.charAt(0)}</span>
                </div>

                {/* Progress Ring Overlay (The "Active" part) */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 z-20 overflow-visible">
                  <circle
                    cx="80" cy="80" r="77"
                    fill="none" stroke="#15173D"
                    strokeWidth="6"
                    strokeDasharray="483.8"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Progress Label */}
                <div className="absolute -bottom-2 z-30 bg-white px-3 py-0.5 rounded-full shadow-sm border border-gray-100 text-[12px] font-bold text-quanverification-brand">
                  100%
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow space-y-4 w-full">
              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={e => setProfile({...profile, name: e.target.value})}
                    className="px-4 py-2 border rounded focus:border-quanverification-brand outline-none text-sm font-bold"
                    placeholder="Full Name"
                  />
                  <input 
                    type="text" 
                    value={profile.role} 
                    onChange={e => setProfile({...profile, role: e.target.value})}
                    className="px-4 py-2 border rounded focus:border-quanverification-brand outline-none text-sm"
                    placeholder="Role"
                  />
                  <input 
                    type="text" 
                    value={profile.location} 
                    onChange={e => setProfile({...profile, location: e.target.value})}
                    className="px-4 py-2 border rounded focus:border-quanverification-brand outline-none text-sm"
                    placeholder="Location"
                  />
                  <input 
                    type="text" 
                    value={profile.phone} 
                    onChange={e => setProfile({...profile, phone: e.target.value})}
                    className="px-4 py-2 border rounded focus:border-quanverification-brand outline-none text-sm"
                    placeholder="Phone"
                  />
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setIsEditingProfile(false)} className="text-sm font-bold text-gray-400">Cancel</button>
                    <button type="submit" className="bg-quanverification-brand text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-md">Save Changes</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2">
                        {profile.name} <Edit2 size={18} className="text-gray-400 cursor-pointer hover:text-quanverification-brand" onClick={() => setIsEditingProfile(true)} />
                      </h1>
                      <p className="text-[16px] font-bold text-gray-700">{profile.role}</p>
                      <p className="text-[14px] text-gray-500">at {profile.company}</p>
                    </div>
                    <div className="text-right text-[12px] text-gray-400">
                      Profile last updated - <span className="font-bold text-gray-600">Today</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                    <div className="flex items-center text-[14px] text-gray-600 gap-2">
                      <MapPin size={16} className="text-gray-400" /> {profile.location}
                    </div>
                    <div className="flex items-center text-[14px] text-gray-600 gap-2">
                      <Phone size={16} className="text-gray-400" /> {profile.phone} <CheckCircle size={14} className="text-[#4CAF50]" />
                    </div>
                    <div className="flex items-center text-[14px] text-gray-600 gap-2">
                      <Briefcase size={16} className="text-gray-400" /> 8 Years 4 Months
                    </div>
                    <div className="flex items-center text-[14px] text-gray-600 gap-2">
                      <Mail size={16} className="text-gray-400" /> {profile.email} <CheckCircle size={14} className="text-[#4CAF50]" />
                    </div>
                    <div className="flex items-center text-[14px] text-gray-600 gap-2">
                      <span className="text-[16px] font-bold">$</span> {profile.salary}
                    </div>
                    <div className="flex items-center text-[14px] text-gray-600 gap-2">
                      <Clock size={16} className="text-gray-400" /> {profile.noticePeriod} notice period
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Sidebar: Quick Links */}
          <div className="w-full lg:w-[320px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-[16px] font-bold text-gray-900">Quick links</h3>
            </div>
            <nav className="flex flex-col">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.name)}
                  className={`flex justify-between items-center px-6 py-3.5 text-[14px] transition-colors ${activeSection === link.name ? 'bg-quanverification-light-brand text-quanverification-brand font-bold border-r-4 border-quanverification-brand' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <span>{link.name}</span>
                  {link.action && (
                    <span className="text-quanverification-brand font-bold hover:underline">{link.action}</span>
                  )}
                </button>
              ))}
              <div className="border-t border-gray-50 mt-2 p-2">
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all group"
                >
                  <LogOut size={18} className="group-hover:translate-x-1 transition-transform text-red-600" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Right Section: Scrollable Content Cards */}
          <div className="flex-grow space-y-8 w-full">

            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-[#FFF9E6] to-[#FFE8CC] rounded-xl p-4 flex items-center justify-between border border-[#FFE0B2]">
              <div className="flex items-center gap-3">
                <span className="text-[18px] font-black text-[#A67C00]">QuanVerification Pro <span className="text-yellow-600">👑</span></span>
                <span className="text-[14px] text-gray-700">Power up with <span className="font-bold">up to 2x recruiter actions</span></span>
              </div>
              <button className="bg-[#5D4037] text-white px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-[#4E342E]">
                Become a Pro | 25% off
              </button>
            </div>

            {/* Resume Section */}
            <div id="Resume" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 scroll-mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-bold text-gray-900">Resume</h2>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">RESUME_JANE_DOE.pdf</span>
                  <span className="text-[12px] text-gray-400 uppercase">Uploaded on Jan 10, 2024</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleDownloadResume}
                    className="text-quanverification-brand hover:text-quanverification-dark-brand transition-colors p-1 hover:bg-quanverification-light-brand rounded"
                  >
                    <Download size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-quanverification-brand transition-colors p-1 hover:bg-gray-50 rounded"><Trash2 size={20} /></button>
                </div>
                <div className="border-2 border-dashed border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center space-y-4 bg-gray-50/30">
                  <label className="bg-white border border-quanverification-brand text-quanverification-brand px-6 py-2 rounded-full font-bold text-[14px] hover:bg-quanverification-light-brand cursor-pointer transition-all">
                    Update resume
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpdateResume}
                      accept=".pdf,.doc,.docx,.rtf"
                    />
                  </label>
                  <p className="text-[12px] text-gray-400">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
                </div>
              </div>
            </div>

            {/* Resume Headline */}
            <div id="Resume headline" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-bold text-gray-900">Resume headline <Edit2 size={16} className="inline ml-2 text-gray-400 cursor-pointer" onClick={() => setIsEditingHeadline(true)} /></h2>
              </div>
              {isEditingHeadline ? (
                <div className="space-y-4">
                  <textarea 
                    value={profile.headline}
                    onChange={e => setProfile({...profile, headline: e.target.value})}
                    className="w-full h-32 p-4 border rounded focus:border-quanverification-brand outline-none text-sm leading-relaxed"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingHeadline(false)} className="text-sm font-bold text-gray-400">Cancel</button>
                    <button onClick={() => setIsEditingHeadline(false)} className="bg-quanverification-brand text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-md">Save Headline</button>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {profile.headline}
                </p>
              )}
            </div>

            {/* Key Skills */}
            <div id="Key skills" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-gray-900">Key skills <Edit2 size={16} className="inline ml-2 text-gray-400 cursor-pointer" onClick={handleAddSkill} /></h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-4 py-1.5 border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-quanverification-brand transition-colors cursor-default group flex items-center gap-2">
                    {skill}
                    <X size={12} className="text-gray-300 hover:text-quanverification-brand cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                  </span>
                ))}
              </div>
              <button 
                onClick={handleAddSkill}
                className="mt-6 text-quanverification-brand text-sm font-bold flex items-center gap-1 hover:underline"
              >
                + Add more skills
              </button>
            </div>

            {/* Employment */}
            <div id="Employment" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-gray-900">Employment</h2>
                <button className="text-quanverification-brand text-[14px] font-bold hover:underline">Add employment</button>
              </div>
              <div className="space-y-8">
                <div className="space-y-2 relative">
                  <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
                    Full Stack Developer <Edit2 size={14} className="text-gray-400" />
                  </h3>
                  <p className="text-[14px] font-bold text-gray-700">Global Tech Solutions</p>
                  <p className="text-[13px] text-gray-500">Full-time | Jan 2022 to Present (2 years 4 months)</p>
                  <p className="text-[13px] text-quanverification-brand font-medium">2 Months Notice Period</p>
                  <p className="text-[14px] text-gray-600 leading-relaxed mt-2">
                    Leading the development of core features for a enterprise-level CRM system. Implementing automated testing and CI/CD pipelines... <span className="text-quanverification-brand cursor-pointer">Read More</span>
                  </p>
                  <p className="text-[13px] text-gray-500 mt-2"><span className="font-bold">Top 5 key skills:</span> React, Node.js, TypeScript, AWS, PostgreSQL</p>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-2">
                  <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
                    Software Engineer Intern <Edit2 size={14} className="text-gray-400" />
                  </h3>
                  <p className="text-[14px] font-bold text-gray-700 uppercase">Startup Hub</p>
                  <p className="text-[13px] text-gray-500 italic uppercase tracking-tighter">Internship | Jun 2021 to Dec 2021 (6 months)</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div id="Education" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-gray-900">Education</h2>
                <button className="text-quanverification-brand text-[14px] font-bold hover:underline">Add education</button>
              </div>
              <div className="space-y-8">
                <div className="space-y-1">
                  <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-2 uppercase">
                    Bachelor of Computing in Computer Science <Edit2 size={14} className="text-gray-400" />
                  </h3>
                  <p className="text-[14px] text-gray-700">National University of India</p>
                  <p className="text-[13px] text-gray-500 uppercase">2017-2021 | Full Time</p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {['Cloud Computing', 'Data Structures', 'Algorithms'].map(p => (
                      <span key={p} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[11px] text-gray-500 uppercase font-bold tracking-tight">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <button className="text-quanverification-brand text-[14px] font-bold block hover:underline">Add doctorate/PhD</button>
                  <button className="text-quanverification-brand text-[14px] font-bold block hover:underline">Add masters/post-graduation</button>
                </div>
              </div>
            </div>

            {/* IT Skills (ID for scroll) */}
            <div id="IT skills" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">IT skills</h2>
              <p className="text-[14px] text-gray-500">Show your technical expertise by mentioning softwares and skills you know</p>
              <button className="text-quanverification-brand text-[14px] font-bold mt-4 hover:underline">Add details</button>
            </div>

            {/* Projects (ID for scroll) */}
            <div id="Projects" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-gray-900">Projects</h2>
                <button className="text-quanverification-brand text-[14px] font-bold hover:underline">Add project</button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">LOAN MANAGEMENT <Edit2 size={14} className="text-gray-400" /></h3>
                  <p className="text-[14px] text-gray-700">OneYes Solutions (Offsite)</p>
                  <p className="text-[13px] text-gray-500">Oct 2023 to Nov 2023 (Full Time)</p>
                </div>
              </div>
            </div>

            {/* Profile summary (ID for scroll) */}
            <div id="Profile summary" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-bold text-gray-900">Profile summary <Edit2 size={16} className="inline ml-2 text-gray-400 cursor-pointer" /></h2>
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Dedicated software developer with a strong foundation in computer science principles and a passion for building user-centric applications...
              </p>
            </div>

            {/* Accomplishments (ID for scroll) */}
            <div id="Accomplishments" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-8">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">Accomplishments</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">Online profile</p>
                    <p className="text-[13px] text-quanverification-brand hover:underline cursor-pointer">linkedin.com/in/jane-doe</p>
                  </div>
                  <button className="text-quanverification-brand text-[14px] font-bold hover:underline">Add</button>
                </div>
              </div>
            </div>

            {/* Career profile (ID for scroll) */}
            <div id="Career profile" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-gray-900">Career profile <Edit2 size={16} className="inline ml-2 text-gray-400 cursor-pointer" /></h2>
              </div>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-[12px] text-gray-400">Current industry</p>
                  <p className="text-[14px] text-gray-800 font-medium">Software Product</p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">Department</p>
                  <p className="text-[14px] text-gray-800 font-medium">Engineering - Software & QA</p>
                </div>
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-gray-900">Languages</h2>
                <button className="text-quanverification-brand text-[14px] font-bold hover:underline">Add languages</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-50">
                      <th className="py-3 font-medium">Languages</th>
                      <th className="py-3 font-medium text-center">Proficiency</th>
                      <th className="py-3 font-medium text-center">Read</th>
                      <th className="py-3 font-medium text-center">Write</th>
                      <th className="py-3 font-medium text-center">Speak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { lang: 'English', prof: 'Native', r: true, w: true, s: true },
                      { lang: 'Mandarin', prof: 'Proficient', r: true, w: true, s: true },
                      { lang: 'Malay', prof: 'Beginner', r: true, w: false, s: false },
                    ].map((item) => (
                      <tr key={item.lang} className="text-gray-700">
                        <td className="py-4 font-bold">{item.lang}</td>
                        <td className="py-4 text-center">{item.prof}</td>
                        <td className="py-4 text-center">{item.r ? <CheckCircle size={16} className="mx-auto text-gray-400" /> : <div className="mx-auto w-4 h-4 border-2 border-gray-200 rounded-full flex items-center justify-center text-[10px] text-gray-300">×</div>}</td>
                        <td className="py-4 text-center">{item.w ? <CheckCircle size={16} className="mx-auto text-gray-400" /> : <div className="mx-auto w-4 h-4 border-2 border-gray-200 rounded-full flex items-center justify-center text-[10px] text-gray-300">×</div>}</td>
                        <td className="py-4 text-center">{item.s ? <CheckCircle size={16} className="mx-auto text-gray-400" /> : <div className="mx-auto w-4 h-4 border-2 border-gray-200 rounded-full flex items-center justify-center text-[10px] text-gray-300">×</div>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Need Help */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center space-x-3 bg-white text-gray-800 px-6 py-4 rounded-full shadow-2xl font-bold transition-all border border-gray-100 group hover:bg-gray-50">
          <div className="bg-quanverification-light-brand p-2 rounded-full text-quanverification-dark-brand group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <span className="text-[17px]">Need any help?</span>
        </button>
      </div>
    </div>
  );
};

export default EndUserDashboard;