import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HelpCircle, Calendar, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('user'); // 'user', 'verifier', 'company'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      name,
      role,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    // In a real app we'd save to a DB, here we simulate session
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-4">
        <nav className="text-[12px] text-gray-500 flex items-center space-x-2">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-gray-400">Register for QuanVerification</span>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-20">
        <h1 className="text-[40px] font-black text-gray-900 mb-12">Register for QuanVerification</h1>

        <form onSubmit={handleRegister} className="max-w-[800px] space-y-10">
          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                I am registering as<span className="text-quanverification-brand ml-0.5">*</span>:
              </label>
            </div>
            <div className="md:col-span-2">
              <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${role === 'user' ? 'bg-white shadow-sm text-quanverification-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  USER
                </button>
                <button
                  type="button"
                  onClick={() => setRole('verifier')}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${role === 'verifier' ? 'bg-white shadow-sm text-quanverification-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  ORGANIZATION
                </button>
                <button
                  type="button"
                  onClick={() => setRole('company')}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${role === 'company' ? 'bg-white shadow-sm text-quanverification-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  COMPANIES
                </button>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                Full name<span className="text-quanverification-brand ml-0.5">*</span>
                <HelpCircle size={14} className="ml-1 text-gray-400" />:
              </label>
              <p className="text-[14px] text-gray-500 font-medium">(As in NRIC or FIN card)</p>
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                Email Address<span className="text-quanverification-brand ml-0.5">*</span>:
              </label>
            </div>
            <div className="md:col-span-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                Password<span className="text-quanverification-brand ml-0.5">*</span>:
              </label>
            </div>
            <div className="md:col-span-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px] pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[12px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* NRIC or FIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                NRIC or FIN number<span className="text-quanverification-brand ml-0.5">*</span>
                <HelpCircle size={14} className="ml-1 text-gray-400" />:
              </label>
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="NRIC / FIN"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px]"
                required
              />
            </div>
          </div>

          {/* Date of Issue */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                Date of issue<span className="text-quanverification-brand ml-0.5">*</span>:
              </label>
            </div>
            <div className="md:col-span-2 relative">
              <input
                type="text"
                placeholder="DD / MM / YYYY"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px]"
                required
              />
              <Calendar size={20} className="absolute right-3 top-[12px] text-gray-400" />
            </div>
          </div>

          {/* Security Check (reCAPTCHA) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[16px] font-bold text-gray-800 flex items-center">
                Security check<span className="text-quanverification-brand ml-0.5">*</span>:
              </label>
            </div>
            <div className="md:col-span-2">
              <div className="w-[300px] p-4 bg-[#F9F9F9] border border-gray-200 rounded flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-6 h-6 rounded border-gray-300" required />
                  <span className="text-[14px] text-gray-700">I&apos;m not a robot</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 h-8 opacity-70" />
                  <span className="text-[8px] text-gray-400">reCAPTCHA</span>
                  <div className="flex space-x-1 mt-0.5">
                    <span className="text-[8px] text-gray-400 hover:underline cursor-pointer">Privacy</span>
                    <span className="text-[8px] text-gray-400">-</span>
                    <span className="text-[8px] text-gray-400 hover:underline cursor-pointer">Terms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms of Use */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300" required />
                <label className="text-[14px] text-gray-700">
                  I have read and agree to the <button type="button" className="text-quanverification-brand hover:underline">Terms of Use</button>
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-2 flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-10 py-2.5 border border-gray-300 font-bold rounded hover:bg-gray-50 transition-colors text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-12 py-2.5 bg-quanverification-brand text-white font-bold rounded hover:bg-quanverification-dark-brand transition-colors shadow-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;