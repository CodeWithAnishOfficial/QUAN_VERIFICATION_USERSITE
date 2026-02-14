import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Briefcase, Clock, CheckCircle,
  Download, ShieldCheck, ArrowLeft
} from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Personal details');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = mockUsers.find(u => u.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);
    }
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">User not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-quanverification-brand font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { name: 'Personal details' },
    { name: 'Resume' },
    { name: 'Key skills' },
    { name: 'Employment' },
    { name: 'Education' },
    { name: 'Projects' },
  ];

  const scrollToSection = (sectionName) => {
    setActiveSection(sectionName);
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Mock download by creating a temporary link
    const link = document.createElement('a');
    link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    link.download = `RESUME_${user.name.toUpperCase().replace(' ', '_')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadFullProfile = () => {
    window.print();
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-8 flex justify-end no-print">
        <button 
          onClick={handleDownloadFullProfile}
          className="bg-quanverification-brand text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-quanverification-dark-brand transition-all shadow-lg"
        >
          <Download size={20} /> Download Full Profile (PDF)
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-4">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-quanverification-brand font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Top Profile Card */}
        <div id="Personal details" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 scroll-mt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[6px] border-gray-100"></div>
                <div className="w-[148px] h-[148px] rounded-full overflow-hidden bg-white border-4 border-white z-10 shadow-sm flex items-center justify-center">
                  <span className="text-6xl font-black text-quanverification-brand">{user.name.charAt(0)}</span>
                </div>
                {user.verified && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90 z-20 overflow-visible">
                    <circle cx="80" cy="80" r="77" fill="none" stroke="#15173D" strokeWidth="6" strokeDasharray="483.8" strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                )}
                <div className="absolute -bottom-2 z-30 bg-white px-3 py-0.5 rounded-full shadow-sm border border-gray-100 text-[12px] font-bold text-quanverification-brand">
                  {user.verified ? 'VERIFIED' : 'PENDING'}
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2">
                    {user.name} {user.verified && <ShieldCheck className="text-quanverification-brand" size={24} />}
                  </h1>
                  <p className="text-[16px] font-bold text-gray-700">{user.role}</p>
                  <p className="text-[14px] text-gray-500">Professional Profile</p>
                </div>
                <div className="bg-quanverification-light-brand px-4 py-2 rounded-lg text-quanverification-brand font-bold text-sm">
                  Verified Member
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                <div className="flex items-center text-[14px] text-gray-600 gap-2">
                  <MapPin size={16} className="text-gray-400" /> {user.location}
                </div>
                <div className="flex items-center text-[14px] text-gray-600 gap-2">
                  <Briefcase size={16} className="text-gray-400" /> 5+ Years Experience
                </div>
                <div className="flex items-center text-[14px] text-gray-600 gap-2">
                  <Mail size={16} className="text-gray-400" /> {user.name.toLowerCase().replace(' ', '.')}@example.com <CheckCircle size={14} className="text-[#4CAF50]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-[320px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-[16px] font-bold text-gray-900">Profile Sections</h3>
            </div>
            <nav className="flex flex-col">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.name)}
                  className={`flex justify-between items-center px-6 py-3.5 text-[14px] transition-colors ${activeSection === link.name ? 'bg-quanverification-light-brand text-quanverification-brand font-bold border-r-4 border-quanverification-brand' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span>{link.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-grow space-y-8 w-full">
            <div id="Resume" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 scroll-mt-24">
              <h2 className="text-[18px] font-bold text-gray-900">Verified Resume</h2>
              <div className="p-4 border border-gray-100 rounded-xl flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Download className="text-quanverification-brand" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">RESUME_{user.name.toUpperCase().replace(' ', '_')}.pdf</p>
                    <p className="text-[12px] text-gray-400">Verified on Jan 10, 2024</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadResume}
                  className="bg-quanverification-brand text-white px-6 py-2 rounded-full font-bold text-[14px] hover:bg-quanverification-dark-brand transition-all shadow-md"
                >
                  Download
                </button>
              </div>
            </div>

            <div id="Key skills" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">Key skills</h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'AWS'].map(skill => (
                  <span key={skill} className="px-4 py-1.5 border border-gray-200 rounded-full text-[13px] text-gray-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div id="Employment" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">Employment History</h2>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-quanverification-brand/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-quanverification-brand"></div>
                  <h3 className="text-[15px] font-bold text-gray-900">{user.role}</h3>
                  <p className="text-[14px] font-bold text-gray-700">Global Tech Solutions</p>
                  <p className="text-[13px] text-gray-500">Jan 2022 to Present</p>
                </div>
              </div>
            </div>

            <div id="Education" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 scroll-mt-24">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-quanverification-brand/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-quanverification-brand"></div>
                  <h3 className="text-[15px] font-bold text-gray-900 uppercase">Bachelor of Computing</h3>
                  <p className="text-[14px] text-gray-700">National University of India</p>
                  <p className="text-[13px] text-gray-500">2017-2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
